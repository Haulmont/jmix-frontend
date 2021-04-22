import {PropertyType} from '@haulmont/jmix-rest';
import {getJmixAppConfig} from '../app/JmixAppProvider';
import { Dayjs } from 'dayjs';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const TIME_FORMAT = 'HH:mm:ss';
export const TIME_WITH_TZ_FORMAT = 'HH:mm:ssZ';

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_TIME_WITH_TZ_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
export const DATE_TIME_WITH_MS_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';
export const DATE_TIME_WITH_MS_WITH_TZ_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

export const defaultDataTransferFormats: Partial<Record<PropertyType, string>> = {
  date: DATE_FORMAT,
  localDate: DATE_FORMAT,
  time: TIME_FORMAT,
  localTime: TIME_FORMAT,
  offsetTime: TIME_WITH_TZ_FORMAT,
  dateTime: DATE_TIME_WITH_MS_FORMAT,
  localDateTime: DATE_TIME_WITH_MS_FORMAT,
  offsetDateTime: DATE_TIME_WITH_MS_WITH_TZ_FORMAT,
};

export const possibleDataTransferFormats: Partial<Record<PropertyType, string[]>> = {
  dateTime: [DATE_TIME_WITH_MS_FORMAT, DATE_TIME_FORMAT],
  localDateTime: [DATE_TIME_WITH_MS_FORMAT, DATE_TIME_FORMAT],
  offsetDateTime: [DATE_TIME_WITH_MS_WITH_TZ_FORMAT, DATE_TIME_WITH_TZ_FORMAT],
};

export const defaultDisplayFormats: Partial<Record<PropertyType, string>> = {
  date: DATE_FORMAT,
  time: TIME_FORMAT,
  dateTime: DATE_TIME_FORMAT,
  localDate: DATE_FORMAT,
  localTime: TIME_FORMAT,
  localDateTime: DATE_TIME_FORMAT,
  offsetDateTime: DATE_TIME_FORMAT,
  offsetTime: TIME_FORMAT,
};

export function getDataTransferFormat(type: PropertyType): string[] | string | undefined {
  return getJmixAppConfig()?.dataTransferFormats?.[type]
    || possibleDataTransferFormats[type]
    || defaultDataTransferFormats[type];
}

export function applyDataTransferFormat(date: Dayjs, type: PropertyType): string {
  const dataTransferFormat = getJmixAppConfig()?.dataTransferFormats?.[type] || defaultDataTransferFormats[type];
  return date.format(dataTransferFormat);
}

export function getDisplayFormat(type: PropertyType): string | undefined {
  return getJmixAppConfig()?.displayFormats?.[type] || defaultDisplayFormats[type];
}

export function applyDisplayFormat(value: Dayjs, type: PropertyType): string {
  return value.format(getDisplayFormat(type));
}
