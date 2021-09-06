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
    mutation?: string;
    listQueryName: string;
    idField?: string; // TODO https://github.com/Haulmont/jmix-frontend/issues/554
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
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    required: true
  },
  {
    caption: 'Mutation to create or update item',
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
];