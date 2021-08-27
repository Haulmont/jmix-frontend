import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {askStringIdQuestions, StringIdAnswers} from "../../../building-blocks/stages/answers/pieces/stringId";
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

export interface Answers extends
EntityAnswer,
ComponentNameAnswer,
QueryAnswer,
MenuItemAnswer,
StringIdAnswers {}

export const entityCardsQuestions: StudioTemplateProperty[] = [
  entityQuestion,
  createComponentNameQuestion({defaultValue: 'Cards'}),
  createQueryQuestion(),
  menuItemQuestion,
];

const questionsToBeAskedInCLI = [
  ...entityCardsQuestions
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, options: CommonGenerationOptions
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
