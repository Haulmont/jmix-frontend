import {getPropertyInfo, isOneToOneComposition, isOneToManyComposition, isTempId, Metadata } from "@haulmont/jmix-react-core";

/**
 * Reformats the entity data so that it can be safely consumed by Jmix GraphQL API.
 * E.g. removes temporary ids and client-side-constructed instance names.
 *
 * @param item
 * @param entityName
 * @param metadata
 * @param stringIdName
 */
export function jmixFront_to_jmixGraphQL(
  item: Record<string, any>,
  entityName: string,
  metadata: Metadata,
  stringIdName?: string
) {
  const result: Record<string, any> = {};

  Object.entries(item).forEach(([attributeName, value]) => {
    const propInfo = getPropertyInfo(metadata.entities, entityName, attributeName);

    // Recursively traverse compositions
    if (propInfo != null && isOneToOneComposition(propInfo) && value != null) {
      result[attributeName] = jmixFront_to_jmixGraphQL(value, propInfo.type, metadata);
      return;
    }
    if (propInfo != null && isOneToManyComposition(propInfo) && value != null) {
      result[attributeName] = value.map((e: Record<string, any>) => jmixFront_to_jmixGraphQL(e, propInfo.type, metadata));
      return;
    }

    // Strip instance names
    if (attributeName === '_instanceName') {
      return;
    }

    // Strip temp ids
    if ((attributeName === 'id' && stringIdName == null) || attributeName === stringIdName) {
      if (!isTempId(value)) {
        result.id = value;
      }
      return;
    }

    result[attributeName] = value;
  });

  return result;
}