import {HasId, HasInstanceName, MayHaveId, MayHaveInstanceName} from "../util/metadata";

export declare type EntityInstance<
  TEntity = unknown,
  TId extends HasId | MayHaveId = MayHaveId,
  TInstanceName extends HasInstanceName | MayHaveInstanceName = MayHaveInstanceName
> = TId & TInstanceName & TEntity;

export function getFields<TEntity>(
  item: EntityInstance<TEntity>,
): string[] {
  const ignoredProperties = ["__typename", "_instanceName", "id"];
  return Object.keys(item).filter(key => !ignoredProperties.includes(key));
}

export function addIdIfExistingEntity(entityId?: string) {
  return entityId == null
    ? undefined
    : { id: entityId };
}
