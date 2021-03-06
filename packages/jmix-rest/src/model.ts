/**
 * @deprecated
 */
export type RestTemporalPropertyType =
  'date' | 'time' | 'dateTime' | 'localDate' | 'localTime' | 'localDateTime' | 'offsetDateTime' | 'offsetTime';

/**
 * @deprecated
 */
export type RestNumericPropertyType = 'int' | 'long' | 'double' | 'decimal';

/**
 * @deprecated
 */
export type RestPropertyType = RestTemporalPropertyType |
  'string' | 'uuid' | 'char'
  | 'byteArray'
  | RestNumericPropertyType
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

export type ViewProperty = string | {name: string, view: View};

export interface View {
  name: string;
  entity: string;
  properties: ViewProperty[];
}

export enum PredefinedView {
  MINIMAL = '_minimal',
  LOCAL = '_local',
  BASE = '_base', // Available since CUBA 6.7
}

export interface EntityMessages {
  [messageKey: string]: string;
}
