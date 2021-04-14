export interface EntityInstanceProps {
  __typename: string;
  _instanceName: string;
  id: string; // TODO perhaps we should have id as _id
}

export declare type EntityInstance<T> = EntityInstanceProps & T;

export function getFields<T>(
  item: EntityInstance<T>,
): string[] {
  const ignoredProperties = ["__typename", "_instanceName", "id"];
  return Object.keys(item).filter(key => !ignoredProperties.includes(key));
}

export function addIdIfExistingEntity(entityId: string, isNewEntity: boolean) {
  return isNewEntity
    ? undefined
    : { id: entityId };
}
