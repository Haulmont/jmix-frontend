import {getJmixAppConfig} from '../app/JmixAppProvider';
import { Dayjs } from 'dayjs';
import { TemporalPropertyType } from '../data/PropertyType';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const TIME_FORMAT = 'HH:mm:ss';
export const TIME_WITH_TZ_FORMAT = 'HH:mm:ssZ';

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_TIME_WITH_TZ_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
export const DATE_TIME_WITH_MS_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';
export const DATE_TIME_WITH_MS_WITH_TZ_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

export const defaultDataTransferFormats: Record<TemporalPropertyType, string> = {
  Date: DATE_FORMAT,
  LocalDate: DATE_FORMAT,
  Time: TIME_FORMAT,
  LocalTime: TIME_FORMAT,
  OffsetTime: TIME_WITH_TZ_FORMAT,
  DateTime: DATE_TIME_WITH_MS_FORMAT,
  LocalDateTime: DATE_TIME_WITH_MS_FORMAT,
  OffsetDateTime: DATE_TIME_WITH_MS_WITH_TZ_FORMAT,
};

export const possibleDataTransferFormats: Partial<Record<TemporalPropertyType, string[]>> = {
  DateTime: [DATE_TIME_WITH_MS_FORMAT, DATE_TIME_FORMAT],
  LocalDateTime: [DATE_TIME_WITH_MS_FORMAT, DATE_TIME_FORMAT],
  OffsetDateTime: [DATE_TIME_WITH_MS_WITH_TZ_FORMAT, DATE_TIME_WITH_TZ_FORMAT],
};

export const defaultDisplayFormats: Record<TemporalPropertyType, string> = {
  Date: DATE_FORMAT,
  Time: TIME_FORMAT,
  DateTime: DATE_TIME_FORMAT,
  LocalDate: DATE_FORMAT,
  LocalTime: TIME_FORMAT,
  LocalDateTime: DATE_TIME_FORMAT,
  OffsetDateTime: DATE_TIME_FORMAT,
  OffsetTime: TIME_FORMAT,
};

export function getDataTransferFormat(type: TemporalPropertyType): string[] | string | undefined {
  return getJmixAppConfig()?.dataTransferFormats?.[type]
    || possibleDataTransferFormats[type]
    || defaultDataTransferFormats[type];
}

export function applyDataTransferFormat(date: Dayjs, type: TemporalPropertyType): string {
  const dataTransferFormat = getJmixAppConfig()?.dataTransferFormats?.[type] || defaultDataTransferFormats[type];
  return date.format(dataTransferFormat);
}

export function getDisplayFormat(type: TemporalPropertyType): string | undefined {
  return getJmixAppConfig()?.displayFormats?.[type] || defaultDisplayFormats[type];
}

export function applyDisplayFormat(value: Dayjs, type: TemporalPropertyType): string {
  return value.format(getDisplayFormat(type));
}
