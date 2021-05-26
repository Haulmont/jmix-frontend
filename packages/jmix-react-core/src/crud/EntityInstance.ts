import {HasId, HasInstanceName, MayHaveId, MayHaveInstanceName} from "../util/metadata";

/**
 * Use this type with entity instance variables.
 * Do not use `HasId` / `MayHaveId` / `WithId` etc. directly.
 *
 * @typeparam TEntity an entity class from the TypeScript SDK (`src/jmix/entities`).
 * @typeparam TId {@link HasId} or {@link MayHaveId} depending on whether the entity has an `id`.
 * @typeparam TInstanceName {@link HasInstanceName} or {@link MayHaveInstanceName} depending on whether the entity has an `_instanceName`.
 */
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
