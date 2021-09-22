import {StudioTemplatePropertyType} from "../../../common/studio/studio-model";

export type EntityListMode = 'edit' | 'view' | 'view with details';

export type MvpEntityBrowserAnswers = {
  componentName: string;
  mode?: EntityListMode;
  query: string;
  mutation?: string;
  idField?: string;
  addToMenu: boolean;
};

export const mvpEntityBrowserQuestions = [
  {
    caption: 'Component name',
    code: 'componentName',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'List',
    required: true
  },
  {
    caption: 'Entity list mode',
    // description: 'Possible values: ' +
    //   '"edit" (there will be buttons to create and edit entity), ' +
    //   '"view" (read-only, there will be no action buttons), ' +
    //   '"view with details" (read-only, there will be a button to view entity details). ' +
    //   'Presence of delete button depends on whether delete mutation has been provided.',
    code: 'mode',
    propertyType: StudioTemplatePropertyType.OPTION,
    defaultValue: 'edit',
    options: ['edit', 'view', 'view with details'],
  },
  {
    caption: 'Query to load items',
    code: 'query',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    required: true
  },
  {
    caption: 'Mutation to delete an item',
    code: 'mutation',
    propertyType: StudioTemplatePropertyType.GRAPHQL_MUTATION,
    required: false
  },
  {
    caption: 'Name of the id attribute',
    code: 'idField',
    propertyType: StudioTemplatePropertyType.STRING,
    required: false,
    defaultValue: 'id'
  },
  {
    caption: "Add to menu",
    code: "menuItem",
    propertyType: StudioTemplatePropertyType.BOOLEAN,
    required: true
  },
];
