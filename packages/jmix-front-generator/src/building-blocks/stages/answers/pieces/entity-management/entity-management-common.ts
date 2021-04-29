import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../../../common/studio/studio-model";

export const commonEntityManagementQuestions: StudioTemplateProperty[] = [
  {
    code: 'entity',
    caption: 'Entity',
    propertyType: StudioTemplatePropertyType.ENTITY,
    required: true
  },
  {
    code: 'managementComponentName',
    caption: 'CRUD component name',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: "Management",
    required: true
  },
  {
    code: 'listType',
    caption: 'List type',
    propertyType: StudioTemplatePropertyType.OPTION,
    defaultValue: "Cards",
    required: true,
    options: ['table', 'cards', 'list']
  },
  {
    code: 'listComponentName',
    caption: 'List component name',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: "List",
    required: true
  },
  {
    code: 'editComponentName',
    caption: 'Edit component name',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'Edit',
    required: true
  }
];

// GraphQL
export const displayAttributesQuestions = [
  {
    code: 'listQuery',
    // Subject to change, in future we might want to get the full query from Studio
    caption: 'Part of GraphQL query representing the requested attributes graph for entity browser component',
    propertyType: StudioTemplatePropertyType.STRING,
    relatedProperty: "entity",
    required: true
  },
  {
    code: 'editQuery',
    // Subject to change, in future we might want to get the full query from Studio
    caption: 'Part of GraphQL query representing the requested attributes graph for entity editor component',
    propertyType: StudioTemplatePropertyType.STRING,
    relatedProperty: "entity",
    required: true
  }
];

// REST
export const viewQuestions = [
  {
    code: 'listView',
    caption: 'List view',
    propertyType: StudioTemplatePropertyType.VIEW,
    relatedProperty: "entity",
    required: true
  },
  {
    code: 'editView',
    caption: 'Edit view',
    propertyType: StudioTemplatePropertyType.VIEW,
    relatedProperty: "entity",
    required: true
  }
];

