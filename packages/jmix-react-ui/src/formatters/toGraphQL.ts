import {getPropertyInfo, isOneToOneComposition, isOneToManyComposition, isTempId, Metadata } from "@haulmont/jmix-react-core";

export function toGraphQL(
  item: Record<string, any>,
  entityName: string,
  metadata: Metadata,
  stringIdName?: string
) {
  const result: Record<string, any> = {};

  Object.entries(item).forEach(([attributeName, value]) => {
    const propInfo = getPropertyInfo(metadata.entities, entityName, attributeName);

    if (propInfo != null && isOneToOneComposition(propInfo) && value != null) {
      result[attributeName] = toGraphQL(value, propInfo.type, metadata);
      return;
    }

    if (propInfo != null && isOneToManyComposition(propInfo) && value != null) {
      result[attributeName] = value.map((e: Record<string, any>) => toGraphQL(e, propInfo.type, metadata));
      return;
    }

    // Strip instance names
    if (attributeName === '_instanceName') {
      // _instanceName in One-to-One Compositions should not be sent back to server as it will cause validation error
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