import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import {
  createComponentNameQuestion,
  ComponentNameAnswer,
  menuItemQuestion,
  MenuItemAnswer,
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";

export interface Answers extends
ComponentNameAnswer,
MenuItemAnswer {};

const blankComponentQuestions: StudioTemplateProperty[] = [
  createComponentNameQuestion({
    defaultValue: 'BlankComponent',
  }),
  menuItemQuestion,
];
  
const questionsToBeAskedInCLI = [
  ...blankComponentQuestions
];

export const allQuestions: StudioTemplateProperty[] = [
  ...questionsToBeAskedInCLI
];

