import {TemporalPropertyType} from '@haulmont/jmix-rest';
import {
  getDataTransferFormat,
  getDisplayFormat,
  isTemporalProperty,
  isFileProperty,
  extractName,
  MetaPropertyInfo,
} from '@haulmont/jmix-react-core';
import dayjs from 'dayjs';

export function toDisplayValue(value: any, propertyInfo: MetaPropertyInfo) {
  if (value == null) {
    return value;
  }

  if (isTemporalProperty(propertyInfo)) {
    // Display format for temporal properties may be different from data transfer format
    const parsed = dayjs(value, getDataTransferFormat(propertyInfo.type as TemporalPropertyType));
    return parsed.format(getDisplayFormat(propertyInfo.type as TemporalPropertyType));
  }

  if (isFileProperty(propertyInfo)) {
    // value is FileRef string. We extract the file name from it.
    return extractName(value);
  }

  return value;
}
