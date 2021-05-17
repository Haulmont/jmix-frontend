import {extractEntityName, getListQueryName } from "../util/graphql";
import { HasId, MayHaveInstanceName } from "../util/metadata";

export function getRelationOptions<
  TData extends Record<string, any> = Record<string, any>
>(entityName: string, data?: TData): Map<string, Array<HasId & MayHaveInstanceName>> | undefined {
  if (data == null) {
    return undefined;
  }

  const map = new Map<string, Array<HasId & MayHaveInstanceName>>();

  Object.keys(data)
    .filter(queryName => {
      // Filter out query result related to the entity being listed so that only relation options are left
      return queryName !== getListQueryName(entityName)
    })
    .map(queryName => {
      const relatedEntityName = extractEntityName(queryName, 'List');
      map.set(relatedEntityName, data[queryName] ?? []);
    });

  return map;
}
