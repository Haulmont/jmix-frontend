import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import { askStringIdQuestions, StringIdAnswers } from "../../../building-blocks/stages/answers/pieces/stringId";
import { isStringIdEntity } from "../../../building-blocks/stages/template-model/pieces/entity";
import {
  entityQuestion,
  EntityAnswer,
  createComponentNameQuestion,
  ComponentNameAnswer,
  createQueryQuestion,
  QueryAnswer,
  menuItemQuestion,
  MenuItemAnswer,
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";

export type CardsInRowOption =
  "2 columns"
  | "3 columns"
  | "4 columns";

const cardsInRowOptions: CardsInRowOption[] = ["2 columns", "3 columns", "4 columns"];

const cardsInRowAnswer: StudioTemplateProperty = {
  caption: "Select the number of cards in a row",
  code: "cardsInRow",
  propertyType: StudioTemplatePropertyType.OPTION,
  required: true,
  options: cardsInRowOptions
};

export interface Answers extends
EntityAnswer,
ComponentNameAnswer,
QueryAnswer,
MenuItemAnswer,
StringIdAnswers {
  cardsInRow: CardsInRowOption;
}

export const entityCardsGridQuestions: StudioTemplateProperty[] = [
  entityQuestion,
  createComponentNameQuestion({defaultValue: 'CardsGrid'}),
  cardsInRowAnswer,
  createQueryQuestion(),
  menuItemQuestion,
];

const questionsToBeAskedInCLI = [
  ...entityCardsGridQuestions
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<Answers> => {  
  const answers = await askQuestions<Answers>(questionsToBeAskedInCLI, projectModel, gen);
  
  if (isStringIdEntity(projectModel, answers.entity)) {
    const stringIdAnswers = await askStringIdQuestions(
      answers.entity,
      projectModel,
      gen
    );
    return {
      ...answers,
      ...stringIdAnswers
    }
  }

  return answers;
}
