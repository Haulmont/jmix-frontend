import {extractEntityName, getByIdQueryName, getListQueryName} from "../util/graphql";
import { HasId } from "../util/metadata";
import { EntityInstance } from "./EntityInstance";

export function getRelationOptions<
  TData extends Record<string, any> = Record<string, any>
>(entityName: string, data?: TData): Map<string, Array<EntityInstance<unknown, HasId>>> | undefined {
  if (data == null) {
    return undefined;
  }

  const map = new Map<string, Array<EntityInstance<unknown, HasId>>>();

  Object.keys(data)
    .filter(queryName => {
      // Filter out query result related to the entity being listed so that only relation options are left
      return queryName !== getListQueryName(entityName)
        && queryName !== getByIdQueryName(entityName);
    })
    .forEach(queryName => {
      const relatedEntityName = extractEntityName(queryName, 'List');
      map.set(relatedEntityName, data[queryName] ?? []);
    });

  return map;
}
