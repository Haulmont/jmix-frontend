import {EntityMessages} from "@haulmont/jmix-rest";
import {AttributeType, EnumInfo, MetaClassInfo, Metadata, MetaPropertyInfo} from '../app/MetadataProvider'
import { PropertyType } from "../data/PropertyType";

export function getPropertyInfo(metadata: MetaClassInfo[], entityName: string, propertyName: string): MetaPropertyInfo | null {
    const metaClass = metadata.find(mci => mci.entityName === entityName);
    if (metaClass == null) {
        return null;
    }
    const propInfo = metaClass.properties.find(prop => prop.name === propertyName);
    return propInfo || null
}

/**
 * A non-nullable version of {@link getPropertyInfo}
 *
 * @param propertyName
 * @param entityName
 * @param metadata
 *
 * @throws `Error` when `propertyInfo` is `null`
 */
export function getPropertyInfoNN(propertyName: string, entityName: string, metadata: MetaClassInfo[]): MetaPropertyInfo {
  const propertyInfo: MetaPropertyInfo | null = getPropertyInfo(
    metadata,
    entityName,
    propertyName);

  if (!propertyInfo) {
    throw new Error('Cannot find MetaPropertyInfo for property ' + propertyName);
  }

  return propertyInfo;
}

/**
 *
 * @param enumValueName
 * @param propertyInfo
 * @param enums
 * @param enumMessages
 *
 * @returns localized entity enum caption
 */
export function getEnumCaption(
  enumValueName: string,
  propertyInfo: MetaPropertyInfo,
  enums: EnumInfo[],
  enumMessages: EntityMessages | null
): string | undefined {
  const enumInfo = enums.find(enumInfo => enumInfo.name === propertyInfo.type);

  if (!enumInfo) {
    return undefined;
  }

  const enumValue = enumInfo.values
    .find(enumValue => enumValue.name === enumValueName);

  if (!enumValue) {
    return undefined;
  }

  return enumMessages ? enumMessages[enumValue.caption] : enumValue.name;
}

/**
 *
 * @param propertyName
 * @param entityName
 * @param messages
 *
 * @returns localized entity property caption
 */
export function getPropertyCaption(propertyName: string, entityName: string, messages: EntityMessages): string {
  return messages[entityName + '.' + propertyName];
}

export function isPropertyTypeSupported(propertyInfo: MetaPropertyInfo): boolean {
  const supportedAttributeTypes: AttributeType[] = ['ENUM', 'ASSOCIATION', 'COMPOSITION'];
  const supportedTypes: PropertyType[] = [
    'String', 'Character',
    'UUID',
    'Integer', 'Double', 'BigDecimal', 'Long',
    'Date', 'Time', 'DateTime',
    'LocalDate', 'LocalTime', 'LocalDateTime',
    'OffsetTime', 'OffsetDateTime',
    'Boolean',
    'fileRef'
  ];

  return supportedAttributeTypes.indexOf(propertyInfo.attributeType) > -1
    || supportedTypes.indexOf(propertyInfo.type as PropertyType) > -1;
}

export function isFileProperty({type}: MetaPropertyInfo): boolean {
  return (type as PropertyType) === 'fileRef';
}

export function isDateProperty({type}: MetaPropertyInfo): boolean {
  return (type as PropertyType) === 'Date';
}

export function isLocalDateProperty({type}: MetaPropertyInfo): boolean {
  return (type as PropertyType) === 'LocalDate';
}

export function isTimeProperty({type}: MetaPropertyInfo): boolean {
  return (type as PropertyType) === 'Time';
}

export function isLocalTimeProperty({type}: MetaPropertyInfo): boolean {
  return (type as PropertyType) === 'LocalTime';
}

export function isOffsetTimeProperty({type}: MetaPropertyInfo): boolean {
  return (type as PropertyType) === 'OffsetTime';
}

export function isDateTimeProperty({type}: MetaPropertyInfo): boolean {
  return (type as PropertyType) === 'DateTime';
}

export function isLocalDateTimeProperty({type}: MetaPropertyInfo): boolean {
  return (type as PropertyType) === 'LocalDateTime';
}

export function isOffsetDateTimeProperty({type}: MetaPropertyInfo): boolean {
  return (type as PropertyType) === 'OffsetDateTime';
}

export function isAnyDateProperty(propertyInfo: MetaPropertyInfo): boolean {
  return isDateProperty(propertyInfo)
    || isLocalDateProperty(propertyInfo);
}

export function isAnyTimeProperty(propertyInfo: MetaPropertyInfo): boolean {
  return isTimeProperty(propertyInfo)
    || isLocalTimeProperty(propertyInfo)
    || isOffsetTimeProperty(propertyInfo);
}

export function isAnyDateTimeProperty(propertyInfo: MetaPropertyInfo): boolean {
  return isDateTimeProperty(propertyInfo)
    || isLocalDateTimeProperty(propertyInfo)
    || isOffsetDateTimeProperty(propertyInfo);
}

export function isTemporalProperty(propertyInfo: MetaPropertyInfo): boolean {
  return isAnyDateProperty(propertyInfo)
    || isAnyTimeProperty(propertyInfo)
    || isAnyDateTimeProperty(propertyInfo);
}

export function isByteArray({attributeType, type}: MetaPropertyInfo): boolean {
  return attributeType === 'DATATYPE' && type === 'ByteArray'
}

export function findEntityMetadata(entityName: string, metadata: Metadata): MetaClassInfo | undefined {
  return metadata.entities.find(entity => entity.entityName === entityName);
}

export function hasRelationProperties(entityInfo: MetaClassInfo): boolean {
  return entityInfo.properties.some(propertyInfo => isRelationProperty(propertyInfo));
}

export function isRelationProperty(propertyInfo: MetaPropertyInfo): boolean {
  return isAssociation(propertyInfo) || isComposition(propertyInfo);
}

export function isOneToOneRelation({cardinality}: MetaPropertyInfo): boolean {
  return cardinality === 'ONE_TO_ONE';
}

export function isOneToManyRelation({cardinality}: MetaPropertyInfo): boolean {
  return cardinality === 'ONE_TO_MANY';
}

export function isManyToOneRelation({cardinality}: MetaPropertyInfo): boolean {
  return cardinality === 'MANY_TO_ONE';
}

export function isManyToManyRelation({cardinality}: MetaPropertyInfo): boolean {
  return cardinality === 'MANY_TO_MANY';
}

export function isToOneRelation({cardinality}: MetaPropertyInfo): boolean {
  return cardinality === "MANY_TO_ONE" || cardinality === "ONE_TO_ONE";
}

export function isToManyRelation({cardinality}: MetaPropertyInfo): boolean {
  return cardinality === "ONE_TO_MANY" || cardinality === "MANY_TO_MANY";
}

export function isAssociation({attributeType}: MetaPropertyInfo): boolean {
  return attributeType === 'ASSOCIATION';
}

export function isToOneAssociation(propertyInfo: MetaPropertyInfo): boolean {
  return isToOneRelation(propertyInfo) && isAssociation(propertyInfo);
}

export function isToManyAssociation(propertyInfo: MetaPropertyInfo): boolean {
  return isToManyRelation(propertyInfo) && isAssociation(propertyInfo);
}

export function isOneToOneAssociation(propertyInfo: MetaPropertyInfo): boolean {
  return isAssociation(propertyInfo) && isOneToOneRelation(propertyInfo);
}

export function isOneToManyAssociation(propertyInfo: MetaPropertyInfo): boolean {
  return isAssociation(propertyInfo) && isOneToManyRelation(propertyInfo);
}

export function isManyToOneAssociation(propertyInfo: MetaPropertyInfo): boolean {
  return isAssociation(propertyInfo) && isManyToOneRelation(propertyInfo);
}

export function isManyToManyAssociation(propertyInfo: MetaPropertyInfo): boolean {
  return isAssociation(propertyInfo) && isManyToManyRelation(propertyInfo);
}

export function isComposition({attributeType}: MetaPropertyInfo): boolean {
  return attributeType === 'COMPOSITION';
}

export function isOneToOneComposition(propertyInfo: MetaPropertyInfo): boolean {
  return isComposition(propertyInfo) && isOneToOneRelation(propertyInfo);
}

export function isOneToManyComposition(propertyInfo: MetaPropertyInfo): boolean {
  return isComposition(propertyInfo) && isOneToManyRelation(propertyInfo);
}

export function isEmbedded({attributeType}: MetaPropertyInfo): boolean {
  return attributeType === 'EMBEDDED';
}

export type EntityId = string | object | number

// Deprecated as "WithSomething" implies that "something" is mandatory rather than optional.
// Also, "withSomething" is a standard convention for HOCs.
// Use "HasSomething" or "MayHaveSomething" instead, unless the variable represents an entity instance,
// in which case use `EntityInstance` with (or without) applicable generic arguments.
/**
 * @deprecated use {@link MayHaveId}
 */
export type WithId = {id?: EntityId};
/**
 * @deprecated use {@link MayHaveName}
 */
export type WithName = {name?: string};

export type HasId = {id: EntityId};
export type MayHaveId = {id?: EntityId};

export type HasInstanceName = {_instanceName: string};
export type MayHaveInstanceName = {_instanceName?: string};

export type HasName = {name: string};
export type MayHaveName = {name?: string};
