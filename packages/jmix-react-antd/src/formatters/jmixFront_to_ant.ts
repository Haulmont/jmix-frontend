import {
  Metadata,
  getDataTransferFormat,
  getPropertyInfo,
  isFileProperty,
  isOneToManyComposition,
  isOneToOneComposition,
  isTemporalProperty,
  isToManyAssociation,
  isToOneAssociation,
  HasId,
  TemporalPropertyType,
  toIdString,
  EntityInstance,
  extractName
} from "@haulmont/jmix-react-core";
import dayjs  from "dayjs";
import { toJS } from "mobx";

/**
 * Reformats the entity data so that it can be
 * properly displayed by Ant Design `<Form>`.
 *
 * @param entityInstance
 * @param entityName
 * @param metadata
 * @param stringIdName
 */
export function jmixFront_to_ant(
  entityInstance: EntityInstance,
  entityName: string,
  metadata: Metadata,
  stringIdName?: string
): Record<string, any> {
  if (entityInstance == null || metadata == null) {
    return {};
  }

  const fields: Record<string, any> = {};

  Object.entries(toJS(entityInstance)).forEach(([attrName, value]) => {
    const propInfo = getPropertyInfo(metadata.entities, entityName, attrName);

    if (propInfo == null) {
      if (attrName === '_instanceName') {
        return;
      }

      console.error(`Cannot find property info for attribute ${attrName} of entity ${entityName}`);
      fields[attrName] = value;
      return;
    }

    // String ID attribute
    const isStringIdAttr: boolean = (stringIdName != null) && (attrName === 'id');
    if (isStringIdAttr) {
      fields[stringIdName!] = value;
      return;
    }

    if(isOneToOneComposition(propInfo)) {
      if (value == null) {
        // We need to explicitly set `null` on empty fields rather than just omit the key.
        // Example of why things can go wrong otherwise: https://github.com/Haulmont/jmix-frontend/issues/318.
        // What happens is that the form fields will be set twice, first with data from Apollo cache and then from network response.
        // If cache contains a value and network response says that the field should be empty, then unless we explicitly set `null`
        // during the second call of `setFieldsValue`, the form will still contain the old value.
        fields[attrName] = null;
        return;
      }

      if (typeof value === 'object') {
        // Recursively traverse child entity
        fields[attrName] = getCompositionAttrValue(value, propInfo.type, metadata);
        return;
      }

      console.error('Expected an object:', value);
      return;
    }

    if (isOneToManyComposition(propInfo)) {
      if (value == null) {
        fields[attrName] = [];
        return;
      }

      // Recursively traverse child entities
      if (Array.isArray(value)) {
        fields[attrName] = value.map((e: EntityInstance) => getCompositionAttrValue(e, propInfo.type, metadata));
        return;
      }

      console.error('Expected an array:', value);
      return;
    }

    if (isToManyAssociation(propInfo)) {
      if (value == null) {
        fields[attrName] = [];
        return;
      }

      // Turn array of EntityInstance into array of ids
      if (Array.isArray(value)) {
        fields[attrName] = value.reduce<string[]>((arrayOfIds, entity) => {
          arrayOfIds.push(toIdString(entity.id));
          return arrayOfIds;
        }, []);
        return;
      }

      console.error('Expected an array:', value);
      return;
    }

    if (isToOneAssociation(propInfo)) {
      if (value == null) {
        fields[attrName] = null;
        return;
      }

      if ((value as HasId).id != null) {
        fields[attrName] = (value as HasId).id;
        return;
      }

      console.error('Expected to have an id:', value);
      return;
    }

    if (isFileProperty(propInfo)) {
      fields[attrName] = typeof value === 'string'
        ? {
          uid: value,
          name: extractName(value),
          size: 0,
          type: ''
        }
        : null;
      return;
    }

    if (isTemporalProperty(propInfo)) {
      if (value == null) {
        fields[attrName] = null;
        return;
      }

      if (typeof value === 'string') {
        const temporalValue = dayjs(value, getDataTransferFormat(propInfo.type as TemporalPropertyType));
        if (temporalValue.isValid()) {
          fields[attrName] = temporalValue;
          return;
        }
      }

      console.error('Expected to be a string representing a valid date:', value);
      return;
    }

    fields[attrName] = value;
    return;
  });

  return fields;
}

function getCompositionAttrValue(
  entityInstance: EntityInstance,
  entityName: string,
  metadata: Metadata
) {
  return {
    ...jmixFront_to_ant(entityInstance, entityName, metadata),
    _instanceName: entityInstance._instanceName
  }
}
