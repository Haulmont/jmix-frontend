import {
  ComponentNameAnswer,
  createComponentNameQuestion,
  MenuItemAnswer
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";
import {StudioTemplatePropertyType} from "../../../common/studio/studio-model";

export type MvpEntityEditorAnswers =
  ComponentNameAnswer
  & MenuItemAnswer
  & {
    query: string;
    mutation: string;
  };

export const mvpEntityEditorQuestions = [
  createComponentNameQuestion({defaultValue: 'Editor'}),
  {
    caption: "Menu item",
    code: "menuItem",
    propertyType: StudioTemplatePropertyType.MENU_ITEM,
    required: false
  },
  {
    caption: 'Query to load item',
    code: 'query',
    propertyType: StudioTemplatePropertyType.STRING,
    required: true
  },
  {
    caption: 'Mutation to create or update item',
    code: 'mutation',
    propertyType: StudioTemplatePropertyType.STRING,
    required: true
  }
];