import {action, computed, observable, ObservableMap} from 'mobx';
import {
  JmixRestConnection,
  EntityAttrPermissionValue,
  EffectivePermsInfo,
  getAttributePermission,
  isOperationAllowed,
  EntityOperationType
} from '@haulmont/jmix-rest';


export class Security {

  @observable attrPermissionCache: ObservableMap<string, EntityAttrPermissionValue> = new ObservableMap();
  @observable private effectivePermissions?: EffectivePermsInfo;
  permissionsRequestCount = 0;

  constructor(private jmixREST: JmixRestConnection) {
  }

  /**
   * Indicates whether the permissions data has been successfully loaded from backend.
   * NOTE: will always return `true` if the REST API version doesn't support effective permissions
   * (REST API version < 7.2).
   */
  @computed get isDataLoaded(): boolean {
    return this.effectivePermissions != null;
  };

  /**
   * Returns current user permissions.
   */
  @computed get permissions(): EffectivePermsInfo {
    return JSON.parse(JSON.stringify(this.effectivePermissions));
  }

  getAttributePermission = (entityName: string, attributeName: string): EntityAttrPermissionValue => {

    if (!this.isDataLoaded) return 'DENY';

    const attrFqn = `${entityName}:${attributeName}`;

    let perm = this.attrPermissionCache.get(attrFqn);
    if (perm != null) return perm;

    perm = getAttributePermission(entityName, attributeName, this.effectivePermissions);
    this.attrPermissionCache.set(attrFqn, perm);
    return perm;
  };

  /**
   * Returns a boolean indicating whether the current user is allowed to upload files.
   * This is convenience method that checks whether a user has a `create` operation permission
   * on `sys$FileDescriptor` entity and `cuba.restApi.fileUpload.enabled` specific permission.
   */
  canUploadAndLinkFile = (): boolean => {
    if (!this.isDataLoaded) {
      return false;
    }

    return isOperationAllowed('sys$FileDescriptor', 'create', this.effectivePermissions);
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

    return isOperationAllowed(entityName, operation, this.effectivePermissions);
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

  @action loadPermissions(): Promise<void> {
    const requestId = ++this.permissionsRequestCount;
    this.effectivePermissions = undefined;
    this.attrPermissionCache.clear();

    return this.jmixREST.getEffectivePermissions()
      .then(action((effectivePermsInfo: EffectivePermsInfo) => {
        if (requestId === this.permissionsRequestCount) {
          this.effectivePermissions = effectivePermsInfo;
        }
      }))
  }

}
