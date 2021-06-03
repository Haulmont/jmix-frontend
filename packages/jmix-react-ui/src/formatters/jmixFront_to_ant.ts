import {
  instanceItemToFormFields,
  Metadata,
  getDataTransferFormat,
  getPropertyInfo,
  isFileProperty,
  isOneToManyComposition,
  isOneToOneComposition,
  isRelationProperty,
  isTemporalProperty,
  isToManyAssociation,
  isToOneAssociation,
  WithId,
  TemporalPropertyType,
  toIdString
} from "@haulmont/jmix-react-core";
import dayjs from "dayjs";
import { toJS } from "mobx";

/**
 * Reformats the entity data so that it can be
 * properly displayed by Ant Design `<Form>`.
 *
 * @typeparam T - entity type.
 *
 * @param item
 * @param entityName
 * @param metadata
 * @param stringIdName
 */
export function jmixFront_to_ant<T>(
  item: Record<string, any>,
  entityName: string,
  metadata: Metadata,
  stringIdName?: string
): Record<string, any> {
  if (item == null || metadata == null) {
    return {};
  }

  const fields: Record<string, any> = {};

  Object.entries(toJS(item)).forEach(([key, value]) => {
    const propInfo = getPropertyInfo(metadata, entityName, key);

    const isStringIdAttr: boolean = (stringIdName != null) && (key === 'id');

    if (isStringIdAttr) {
      fields[stringIdName!] = value;
      return;
    }

    if (propInfo == null) {
      fields[key] = value;
      return;
    }

    if(isOneToOneComposition(propInfo)) {
      if (value != null) {
        fields[key] = instanceItemToFormFields(value, propInfo.type, metadata);
        return;
      }

      // We need to explicitly set `null` on empty fields rather than just omit the key.
      // Example of why things can go wrong otherwise: https://github.com/Haulmont/jmix-frontend/issues/318.
      // What happens is that the form fields will be set twice, first with data from Apollo cache and then from network response.
      // If cache contains a value and network response says that the field should be empty, then unless we explicitly set `null`
      // during the second call of `setFieldsValue`, the form will still contain the old value.
      fields[key] = null;
      return;
    }

    if (isOneToManyComposition(propInfo)) {
      value == null
        ? fields[key] = []
        : fields[key] = value.map((e: T) => instanceItemToFormFields(e, propInfo.type, metadata));
      return;
    }

    if (isToManyAssociation(propInfo)) {
      if (value == null) {
        fields[key] = [];
        return;
      }

      const entityList = value as unknown as WithId[];
      fields[key] = entityList.reduce<string[]>((accumulator, nextEntity) => {
        accumulator.push(toIdString(nextEntity.id!));
        return accumulator;
      }, []);
      return;
    }

    if (isRelationProperty(propInfo) && value == null) {
      fields[key] = value;
      return;
    }

    if (isFileProperty(propInfo)) {
      fields[key] = value; // FileRef string
      return;
    }

    if (isToOneAssociation(propInfo)) {
      fields[key] = (value as WithId).id!;
      return;
    }

    if (isTemporalProperty(propInfo)) {
      if (value != null) {
        fields[key] = dayjs(value, getDataTransferFormat(propInfo.type as TemporalPropertyType));
      } else {
        fields[key] = null;
      }
      return;
    }

    if (value == null) {
      fields[key] = null;
      return;
    }

    fields[key] = value;
    return;
  });

  return fields;
}