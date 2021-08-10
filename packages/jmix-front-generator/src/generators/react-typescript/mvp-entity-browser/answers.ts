import {
  ComponentNameAnswer,
  createComponentNameQuestion, MenuItemAnswer, QueryAnswer
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";
import {StudioTemplatePropertyType} from "../../../common/studio/studio-model";

export type MvpEntityBrowserAnswers =
  ComponentNameAnswer
  & MenuItemAnswer
  & {
    query: string;
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
  }
];
