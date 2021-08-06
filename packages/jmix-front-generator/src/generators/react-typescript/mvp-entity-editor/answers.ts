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
    queryName: string;
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
    caption: 'Query name',
    code: 'queryName',
    propertyType: StudioTemplatePropertyType.STRING,
    required: true
  }
];