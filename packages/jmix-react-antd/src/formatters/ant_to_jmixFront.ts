import {
  getPropertyInfo,
  isEmbedded,
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

/**
 * Reformats the entity data received from Ant Design `<Form>`
 * into internal UI kit agnostic format.
 *
 * @param item
 * @param entityName
 * @param metadata
 * @param stringIdName
 */
export function ant_to_jmixFront(
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
      result[attributeName] = ant_to_jmixFront(value, propInfo.type, metadata);
      return;
    }

    if (propInfo && isOneToManyComposition(propInfo)) {
      value == null
        ? result[attributeName] = []
        : result[attributeName] = value.map((e: Record<string, any>) => ant_to_jmixFront(e, propInfo.type, metadata));
      return;
    }

    if (propInfo && isToOneAssociation(propInfo) && (typeof value === 'string' || typeof value === 'number')) {
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

    if (propInfo && isEmbedded(propInfo)) {
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