import dayjs, { Dayjs } from "dayjs";
import { getPropertyInfo } from "../util/metadata";
import { getMetadata } from "../app/MetadataProvider";
import { getDataTransferFormat } from "../util/formats";
import { TemporalPropertyType } from "../data/PropertyType";
import { EntityInstance } from "../crud/EntityInstance";

export const getDateProperty = <T>(entityName: string, item: EntityInstance<T>, propertyName: keyof T): Dayjs | void => {
  const {entities} = getMetadata();
  const propInfo = getPropertyInfo(entities, entityName, propertyName as string);
  const value = item[propertyName];

  if (typeof value === 'string') {
    const dateProperty = dayjs(value, getDataTransferFormat(propInfo?.type as TemporalPropertyType));
    return dateProperty;
  }
}
