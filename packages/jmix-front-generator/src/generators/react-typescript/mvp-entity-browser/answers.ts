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
    mutation: string;
    idField?: string;
    nameField?: string;
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
    propertyType: StudioTemplatePropertyType.STRING,
    required: true
  },
  {
    caption: 'Mutation to delete an item',
    code: 'mutation',
    propertyType: StudioTemplatePropertyType.STRING,
    required: true
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
