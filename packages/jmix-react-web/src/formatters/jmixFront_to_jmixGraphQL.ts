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

    if (propInfo == null) {
      // There won't be property info e.g. for `_instanceName`.
      // Normally we would expect everything that is a part of a valid input object to have property info.
      return;
    }

    // Recursively traverse compositions
    if (isOneToOneComposition(propInfo) && value != null) {
      result[attributeName] = jmixFront_to_jmixGraphQL(value, propInfo.type, metadata);
      return;
    }
    if (isOneToManyComposition(propInfo) && value != null) {
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

    // Strip read-only fields
    if (propInfo.readOnly) {
      return;
    }

    result[attributeName] = value;
  });

  return result;
}