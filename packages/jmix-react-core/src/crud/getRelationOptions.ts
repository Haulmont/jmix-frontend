import {extractEntityName, getByIdQueryName, getListQueryName} from "../util/graphql";
import { HasId } from "../util/metadata";
import { EntityInstance } from "./EntityInstance";

export function getRelationOptions<
  TData extends Record<string, any> = Record<string, any>
>(entityName: string, data?: TData, includeSelfReference?: boolean): Map<string, Array<EntityInstance<unknown, HasId>>> | undefined {
  if (data == null) {
    return undefined;
  }

  const map = new Map<string, Array<EntityInstance<unknown, HasId>>>();

  const currentId = data[getByIdQueryName(entityName)]?.id

  Object.keys(data)
    .filter(queryName => {
      const isEntityListQuery = queryName === getListQueryName(entityName)
      const isEntityByIdQuery = queryName === getByIdQueryName(entityName)
      // Filter out query result related to the entity being listed so that only relation options are left
      return (includeSelfReference || !isEntityListQuery) && !isEntityByIdQuery;
    })
    .map(queryName => {
      const relatedEntityName = extractEntityName(queryName, 'List');

      if (queryName === getListQueryName(entityName)) {
        map.set(relatedEntityName, data[queryName]?.filter((x: any) => x.id !== currentId) ?? []);
      } else {
        map.set(relatedEntityName, data[queryName] ?? []);
      }
    });

  return map;
}
