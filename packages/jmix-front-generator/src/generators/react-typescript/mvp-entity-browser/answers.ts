import {
  ComponentNameAnswer,
  createComponentNameQuestion,
  MenuItemAnswer,
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";
import {StudioTemplatePropertyType} from "../../../common/studio/studio-model";

export type EntityListMode = 'edit' | 'view' | 'viewWithDetails';

export type MvpEntityBrowserAnswers =
  ComponentNameAnswer
  & MenuItemAnswer
  & {
    query: string;
    mutation?: string;
    mode?: EntityListMode;
    idField?: string;
  };

export const mvpEntityBrowserQuestions = [
  createComponentNameQuestion({defaultValue: 'List'}),
  {
    caption: "Menu item",
    code: "menuItem",
    propertyType: StudioTemplatePropertyType.MENU_ITEM,
    required: false
  },
  {
    caption: 'Query to load items',
    code: 'query',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    required: true
  },
  {
    caption: 'Entity list mode: ' +
      '"edit" (there will be buttons to create and edit entity), ' +
      '"view" (read-only, there will be no action buttons), ' +
      '"viewWithDetails" (read-only, there will be a button to view entity details). ' +
      'Presence of delete button depends on whether delete mutation has been provided.',
    code: 'mode',
    propertyType: StudioTemplatePropertyType.OPTION,
    defaultValue: 'edit',
    options: ['readOnly', 'edit', 'details'],
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
    required: false
  }
];
