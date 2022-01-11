import { action, computed, observable, ObservableMap, makeObservable } from 'mobx';
import {
  EntityAttrPermissionValue,
  EffectivePermsInfo,
  getAttributePermission,
  isOperationAllowed,
  isSpecificPermissionGranted,
  EntityOperationType,
  isMenuPermissionGranted,
  isScreenPermissionGranted
} from '../util/security'
import {ApolloClient} from "@apollo/client";
import {gql} from "@apollo/client/core";
import { getPropertyInfo, MetaClassInfo } from '..';

export const PERMISSIONS_QUERY = gql`query {
  permissions {
    entities {
      target
      value
    },
    entityAttributes {
      target
      value
    }
    specifics {
      target
      value
    }
    ${process.env.REACT_APP_ENABLE_UI_PERMISSIONS === "true" 
      ? `
        menus {
          target
          value
        }
        screens {
          target
          value
        }`
      : ""
    }
  }
}`;

export class Security {

  attrPermissionCache: ObservableMap<string, EntityAttrPermissionValue> = new ObservableMap();
  private effectivePermissions: EffectivePermsInfo | null = null;
  permissionsRequestCount = 0;

  constructor(private apolloClient: ApolloClient<unknown>) {
    makeObservable<Security, "effectivePermissions">(this, {
      attrPermissionCache: observable,
      effectivePermissions: observable,
      isDataLoaded: computed,
      permissions: computed,
      loadPermissions: action
    });
  }

  /**
   * Indicates whether the permissions data has been successfully loaded from backend.
   * NOTE: will always return `true` if the REST API version doesn't support effective permissions
   * (REST API version < 7.2).
   */
  get isDataLoaded(): boolean {
    return this.effectivePermissions != null;
  }

  /**
   * Returns current user permissions.
   */
  get permissions(): EffectivePermsInfo {
    return JSON.parse(JSON.stringify(this.effectivePermissions));
  }

  getAttributePermission = (entityName: string, attributeName: string, metadata?: MetaClassInfo[]): EntityAttrPermissionValue => {
    const separatorIdx = attributeName.indexOf('.')

    if (separatorIdx !== -1) {
      if (metadata == null) {
        return 'DENY'
      }

      const parentPropName = attributeName.slice(0, separatorIdx)
      const propertyInfo = getPropertyInfo(metadata, entityName, parentPropName)
      const subPropertyName = attributeName.slice(separatorIdx + 1)

      if (propertyInfo == null || !(propertyInfo.attributeType === 'ASSOCIATION' || propertyInfo.attributeType === 'COMPOSITION')) {
        return 'DENY'
      }

      return this.getAttributePermission(propertyInfo.type, subPropertyName, metadata)
    }

    if (!this.isDataLoaded) return 'DENY';

    const attrFqn = `${entityName}:${attributeName}`;

    let perm = this.attrPermissionCache.get(attrFqn);
    if (perm != null) return perm;

    perm = getAttributePermission(entityName, attributeName, this.effectivePermissions ?? undefined);
    this.attrPermissionCache.set(attrFqn, perm);
    return perm;
  };

  /**
   * Returns a boolean indicating whether the current user is allowed to upload files.
   */
  canUploadFiles = (): boolean => {
    return this.isSpecificPermissionGranted('graphql.fileUpload.enabled');
  };

  /**
   * Returns a boolean indicating whether the current user is allowed to download files.
   */
  canDownloadFiles = (): boolean => {
    return this.isSpecificPermissionGranted('graphql.fileDownload.enabled');
  };

  /**
   * Returns a boolean indicating whether a given entity operation permission is granted
   * to the current user.
   *
   * @param entityName
   * @param operation
   */
  isOperationPermissionGranted = (entityName: string, operation: EntityOperationType): boolean => {
    if (!this.isDataLoaded) { return false; }

    return isOperationAllowed(entityName, operation, this.effectivePermissions ?? undefined);
  };

  /**
   * Returns a boolean indicating whether a given entity attribute permission is granted
   * to the current user.
   *
   * @param entityName
   * @param attrName
   * @param requiredAttrPerm
   */
  isAttributePermissionGranted = (
    entityName: string,
    attrName: string,
    requiredAttrPerm: Exclude<EntityAttrPermissionValue, 'DENY'>
  ): boolean => {
    if (!this.isDataLoaded) { return false; }

    const attrPerm = this.getAttributePermission(entityName, attrName);

    if (attrPerm === 'DENY') {
      return false;
    }
    if (attrPerm === 'MODIFY') {
      return true;
    }
    return requiredAttrPerm === 'VIEW';
  }

  isSpecificPermissionGranted = (target: string): boolean => {
    if (!this.isDataLoaded) { return false; }

    return isSpecificPermissionGranted(target, this.effectivePermissions ?? undefined);
  }

  isMenuPermissionGranted = (key: string): boolean => {
    if (!this.isDataLoaded) { return false; }

    return isMenuPermissionGranted(key, this.effectivePermissions ?? undefined);
  }

  isScreenPermissionGranted = (screenId: string): boolean => {
    if (!this.isDataLoaded) { return false; }

    return isScreenPermissionGranted(screenId, this.effectivePermissions ?? undefined);
  }

  loadPermissions(): Promise<void> {
    const requestId = ++this.permissionsRequestCount;
    this.effectivePermissions = null;
    this.attrPermissionCache.clear();

    return this.apolloClient.query({
        query: PERMISSIONS_QUERY
      }).then(action(resp => {
        if (requestId === this.permissionsRequestCount) {
          this.effectivePermissions = resp.data.permissions;
        }
      }));
  }

}
