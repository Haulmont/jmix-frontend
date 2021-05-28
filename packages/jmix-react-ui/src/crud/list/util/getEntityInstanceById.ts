import { EntityInstance, toIdString } from "@haulmont/jmix-react-core";

export function getEntityInstanceById<TEntity = unknown>(id: string, items: Array<EntityInstance<TEntity>>): EntityInstance<TEntity> {
  const record: EntityInstance<TEntity> | undefined = (items ?? []).find((item: EntityInstance<TEntity>) => toIdString(item.id!) === id);

  if (!record) {
    throw new Error("Cannot find entity with id " + id);
  }

  return record;
}