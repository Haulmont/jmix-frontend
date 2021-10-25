export type EntityAttrPermissionValue = 'DENY' | 'VIEW' | 'MODIFY';
export type EntityOperationType = 'create' | 'read' | 'update' | 'delete';
export type AttributePermissionValue = 0 | 1 | 2;
export type EntityPermissionValue = 0 | 1;
export type SpecificPermissionValue = 0 | 1;

export interface Permission<T extends AttributePermissionValue | EntityPermissionValue | SpecificPermissionValue> {
  target: string; value: T;
}

export interface EffectivePermsInfo {
  entities: Array<Permission<EntityPermissionValue>>;
  entityAttributes: Array<Permission<AttributePermissionValue>>;
  specifics: Array<Permission<SpecificPermissionValue>>;
}

export function isSpecificPermissionGranted(target: string, perms?: EffectivePermsInfo): boolean {
  if (perms == null) {
    return false;
  }

  return perms
    .specifics
    ?.find((perm => perm.target === target))
    ?.value === 1;
}

// noinspection JSUnusedGlobalSymbols
/**
 *
 * Define which type of attribute render allowed for user
 *
 * @param entityName CUBA model entity
 * @param attributeName
 * @param perms - user effective permissions
 * @return attribute could be not allowed to display (DENY), allowed for modification (MODIFY)
 * or allowed in read only mode (VIEW).
 */
export function getAttributePermission(
  entityName: string,
  attributeName: string,
  perms?: EffectivePermsInfo
): EntityAttrPermissionValue {
  if (!perms)
    return 'DENY';

  const {entityAttributes} = perms;

  // find strict perm match 'car:engine'
  const explicitPerm = entityAttributes
    .find(perm => perm.target === `${entityName}:${attributeName}`);

  if (explicitPerm)
    return convertAttributePermValue(explicitPerm.value);

  return 'DENY';
}

// noinspection JSUnusedGlobalSymbols
/**
 * Define if operation (one of CRUD) on entity allowed or not for user
 *
 * @param entityName CUBA model entity
 * @param operation - operation to be checked (CRUD)
 * @param perms - user effective permissions
 */
 export function isOperationAllowed(
  entityName: string,
  operation: EntityOperationType,
  perms?: EffectivePermsInfo
): boolean {
  if (!perms)
    return false;

  const {entities} = perms;

  // find strict perm match 'car:read'
  const explicitPerm =
    entities.find(perm => perm.target === `${entityName}:${operation}`);

  if (explicitPerm)
    return explicitPerm.value === 1;

  return false;
}

function convertAttributePermValue(val: AttributePermissionValue): EntityAttrPermissionValue {
  switch (val) {
    case 2: return 'MODIFY';
    case 1: return 'VIEW';
    default: return 'DENY';
  }
}
