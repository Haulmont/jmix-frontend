export type Cardinality = 'NONE' | 'ONE_TO_ONE' | 'MANY_TO_ONE' | 'ONE_TO_MANY' | 'MANY_TO_MANY';

export type AttributeType = 'DATATYPE' | 'ENUM' | 'ASSOCIATION' | 'COMPOSITION';

export type TemporalPropertyType =
  'date' | 'time' | 'dateTime' | 'localDate' | 'localTime' | 'localDateTime' | 'offsetDateTime' | 'offsetTime';

export type NumericPropertyType = 'int' | 'long' | 'double' | 'decimal';

export type PropertyType = TemporalPropertyType |
  'string' | 'uuid' | 'char'
  | 'byteArray'
  | NumericPropertyType
  | 'boolean';

export interface SerializedEntityProps {
  _entityName?: string;
  _instanceName?: string;
}

export interface ICubaRestCheckStatusError {
  message?: string;
  response?: Response;
}

export type SerializedEntity<T> = SerializedEntityProps & T;

export interface EntitiesWithCount<T> {
  result: Array<SerializedEntity<T>>;
  count: number;
}

export interface MetaPropertyInfo {
  name: string;
  type: string;
  mandatory: boolean;
  readOnly: boolean;
  isTransient: boolean;
  description: string;
  attributeType: AttributeType;
  cardinality: Cardinality;
}

export interface MetaClassInfo {
  entityName: string;
  properties: MetaPropertyInfo[];
}

export interface UserInfo {
  id: string;
  login: string;
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  email: string;
  timeZone: string;
  language: string;
  _instanceName: string;
  locale: string;
}

export type EntityOperationType = 'create' | 'read' | 'update' | 'delete';
export type EntityAttrPermissionValue = 'DENY' | 'VIEW' | 'MODIFY';
export interface EffectivePermsLoadOptions {
  entities: boolean;
  entityAttributes: boolean;
  specifics: boolean;
}

export type AttributePermissionValue = 0 | 1 | 2;
export type EntityPermissionValue = 0 | 1;
export type SpecificPermissionValue = 0 | 1;

export interface Permission<T extends AttributePermissionValue | EntityPermissionValue | SpecificPermissionValue> {
  target: string; value: T;
}

export interface EffectivePermsInfo {
  entities: Array<Permission<EntityPermissionValue>>;
  entityAttributes: Array<Permission<AttributePermissionValue>>;
  specifics: Array<Permission<SpecificPermissionValue>>;
}

export interface EnumValueInfo {
  name: string;
  id: string | number;
  caption: string;
}

export interface EnumInfo {
  name: string;
  values: EnumValueInfo[];
}

export type ViewProperty = string | {name: string, view: View};

export interface View {
  name: string;
  entity: string;
  properties: ViewProperty[];
}

export enum PredefinedView {
  INSTANCE_NAME = '_instance_name',
  LOCAL = '_local',
  BASE = '_base', // Available since CUBA 6.7
}

export interface EntityMessages {
  [messageKey: string]: string;
}
