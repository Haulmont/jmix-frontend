import { StepQuestionParam } from "../../building-blocks/stages/answers/pieces/defaultAnswers";
import {RestService, RestServiceMethod} from "../model/cuba-model";

export const enum StudioTemplatePropertyType {
  ENTITY = 'ENTITY',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  INTEGER = 'INTEGER',
  OPTION = 'OPTION',
  MULTI_OPTION = 'MULTI_OPTION',
  POLYMER_COMPONENT_NAME = 'POLYMER_COMPONENT_NAME',
  PASSWORD = 'PASSWORD',
  GRAPHQL_QUERY = 'GRAPHQL_QUERY',
  MENU_ITEM = 'MENU_ITEM',
  ATTRIBUTE = 'ATTRIBUTE',
  ATTRIBUTES_ARRAY = 'ATTRIBUTES_ARRAY',

  // deprecated types
  VIEW = 'VIEW',
  NESTED_ENTITY_VIEW = 'NESTED_ENTITY_VIEW',
  REST_QUERY = 'REST_QUERY',
  REST_SERVICE_METHOD = 'REST_SERVICE_METHOD',
}

export interface BaseStudioTemplateProperty {
  code: string;
  caption: string;
  propertyType: StudioTemplatePropertyType;
  defaultValue?: string;
  required?: boolean;
  step?: StepQuestionParam;
  // --not supported
  //advanced: boolean;
  //filterScript: string;
}

export interface EntityStudioTemplateProperty extends BaseStudioTemplateProperty {
  propertyType: StudioTemplatePropertyType.ENTITY;
}

export interface StringStudioTemplateProperty extends BaseStudioTemplateProperty {
  propertyType: StudioTemplatePropertyType.STRING;
}

export interface BooleanStudioTemplateProperty extends BaseStudioTemplateProperty {
  propertyType: StudioTemplatePropertyType.BOOLEAN;
}

export interface IntegerStudioTemplateProperty extends BaseStudioTemplateProperty {
  propertyType: StudioTemplatePropertyType.INTEGER;
}

export interface OptionStudioTemplateProperty extends BaseStudioTemplateProperty {
  propertyType: StudioTemplatePropertyType.OPTION;
  options: string[];
}

export interface MultiOptionStudioTemplateProperty extends BaseStudioTemplateProperty {
  propertyType: StudioTemplatePropertyType.MULTI_OPTION;
  options: any[];
}

export interface ComponentNameStudioTemplateProperty extends BaseStudioTemplateProperty {
  propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME;
}

export interface PasswordStudioTemplateProperty extends BaseStudioTemplateProperty {
  propertyType: StudioTemplatePropertyType.PASSWORD;
}

export interface GraphqlQueryStudioTemplateProperty extends BaseStudioTemplateProperty {
  propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY;
  relatedProperty: string;
}

export interface MenuItemStudioTemplateProperty extends BaseStudioTemplateProperty {
  propertyType: StudioTemplatePropertyType.MENU_ITEM;
}

type AttributeStudioTemplatePropertyOptionTypes = 'number' | 'string' | 'boolean' | 'datetime' | 'date' | 'time' | 'reference';
export interface AttributeStudioTemplateProperty extends BaseStudioTemplateProperty {
  options?: AttributeStudioTemplatePropertyOptionTypes[];
  propertyType: StudioTemplatePropertyType.ATTRIBUTE;
  relatedProperty: string;
}
export interface AttributesArrayStudioTemplateProperty extends BaseStudioTemplateProperty {
  options?: AttributeStudioTemplatePropertyOptionTypes[];
  propertyType: StudioTemplatePropertyType.ATTRIBUTES_ARRAY;
  relatedProperty: string;
}

export interface DeprecatedStudioTemplateProperties extends BaseStudioTemplateProperty {
  propertyType: StudioTemplatePropertyType.VIEW
    | StudioTemplatePropertyType.NESTED_ENTITY_VIEW
    | StudioTemplatePropertyType.REST_QUERY
    | StudioTemplatePropertyType.REST_SERVICE_METHOD;
  options?: string[];
  relatedProperty?: string;
}

export type StudioTemplateProperty =
  EntityStudioTemplateProperty
  | StringStudioTemplateProperty
  | BooleanStudioTemplateProperty
  | IntegerStudioTemplateProperty
  | OptionStudioTemplateProperty
  | MultiOptionStudioTemplateProperty
  | ComponentNameStudioTemplateProperty
  | PasswordStudioTemplateProperty
  | GraphqlQueryStudioTemplateProperty
  | MenuItemStudioTemplateProperty
  | AttributeStudioTemplateProperty
  | AttributesArrayStudioTemplateProperty
  | DeprecatedStudioTemplateProperties;

export interface RestServiceMethodModel {
  service: RestService;
  method: RestServiceMethod;
}

export interface EntityInfo {
  name: string;
}

export interface ViewInfo {
  name: string;
  entityName: string;
}

export interface RestQueryInfo {
  name: string;
  entityName: string;
}

export interface RestServiceMethodInfo {
  serviceName: string;
  methodName: string;
}
