import {
  ComponentNameAnswer,
  createComponentNameQuestion,
  MenuItemAnswer,
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";
import {StudioTemplatePropertyType} from "../../../common/studio/studio-model";

export type MvpEntityBrowserAnswers =
  ComponentNameAnswer
  & MenuItemAnswer
  & {
    query: string;
    mutation?: string;
    enableEdit: boolean;
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
    caption: 'Allow creating and editing items',
    code: 'enableEdit',
    propertyType: StudioTemplatePropertyType.BOOLEAN,
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
    required: false
  },
  {
    caption: 'Name of the name attribute',
    code: 'nameField',
    propertyType: StudioTemplatePropertyType.STRING,
    required: false
  }
];
