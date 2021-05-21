import {
  getPropertyInfo,
  isOneToManyComposition,
  isOneToOneComposition,
  isTemporalProperty,
  isToManyAssociation,
  isToOneAssociation,
  Metadata,
  TemporalPropertyType,
  applyDataTransferFormat,
} from "@haulmont/jmix-react-core";
import dayjs from "dayjs";

// TODO rename to ant2jmix
export function antFormToGraphQL(
  item: Record<string, any>,
  entityName: string,
  metadata: Metadata,
  stringIdName?: string
): Record<string, any> {
  const result: Record<string, any> = {};

  Object.entries(item).forEach(([attributeName, value]) => {
    const propInfo = getPropertyInfo(metadata.entities, entityName, attributeName);

    // String ID
    if (attributeName === stringIdName) {
      result.id = value;
      return;
    }

    if (propInfo && isOneToOneComposition(propInfo) && value != null) {
      result[attributeName] = antFormToGraphQL(value, propInfo.type, metadata);
      return;
    }

    if (propInfo && isOneToManyComposition(propInfo)) {
      value == null
        ? result[attributeName] = []
        : result[attributeName] = value.map((e: Record<string, any>) => antFormToGraphQL(e, propInfo.type, metadata));
      return;
    }

    if (propInfo && isToOneAssociation(propInfo) && typeof value === 'string') {
      result[attributeName] = {id: value};
      return;
    }

    if (propInfo && isToManyAssociation(propInfo) && Array.isArray(value)) {
      result[attributeName] = value?.map(id => ({id}));
      return;
    }

    if (propInfo && isTemporalProperty(propInfo) && value != null && dayjs.isDayjs(value)) {
      const normalizedValue = value.millisecond(0);
      result[attributeName] = applyDataTransferFormat(normalizedValue, propInfo.type as TemporalPropertyType)
      return;
    }

    if (value === '' || value == null) {
      result[attributeName] = null;
      return;
    }
    result[attributeName] = value;
  });

  return result;
}