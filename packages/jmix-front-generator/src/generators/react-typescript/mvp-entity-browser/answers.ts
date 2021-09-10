import {
  ComponentNameAnswer,
  createComponentNameQuestion,
  MenuItemAnswer,
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";
import {StudioTemplatePropertyType} from "../../../common/studio/studio-model";

export type EntityListMode = 'edit' | 'view' | 'view with details';

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
