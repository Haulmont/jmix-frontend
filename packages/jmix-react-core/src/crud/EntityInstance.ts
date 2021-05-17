import {MayHaveId, MayHaveInstanceName} from "../util/metadata";

export declare type EntityInstance<T = any> = MayHaveId & MayHaveInstanceName & T;

export function getFields<T>(
  item: EntityInstance<T>,
): string[] {
  const ignoredProperties = ["__typename", "_instanceName", "id"];
  return Object.keys(item).filter(key => !ignoredProperties.includes(key));
}

export function addIdIfExistingEntity(entityId?: string) {
  return entityId == null
    ? undefined
    : { id: entityId };
}
