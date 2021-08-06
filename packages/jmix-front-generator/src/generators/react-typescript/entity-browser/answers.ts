import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {
  askStringIdQuestions,
  StringIdAnswers,
  stringIdQuestions
} from "../../../building-blocks/stages/answers/pieces/stringId";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {isStringIdEntity} from "../common/entity";
import {
  entityQuestion,
  EntityAnswer,
  createComponentNameQuestion,
  ComponentNameAnswer,
  createQueryQuestion,
  QueryAnswer,
  menuItemQuestion,
  MenuItemAnswer,
  StepQuestionParam,
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";

export type BrowserTypes = 'table' | 'list' | 'cards';

interface BrowserTypeQuestionOptons {
  step?: StepQuestionParam;
}
export const createBrowserTypeQuestion = (options?: BrowserTypeQuestionOptons): StudioTemplateProperty => ({
  code: 'browserType',
  caption: 'Browser type',
  propertyType: StudioTemplatePropertyType.OPTION,
  defaultValue: "Cards",
  required: true,
  options: ['table', 'cards', 'list'],
  step: options?.step
});

export interface EntityBrowserAnswers extends 
EntityAnswer,
ComponentNameAnswer,
QueryAnswer,
MenuItemAnswer,
StringIdAnswers {
  browserType: BrowserTypes;
}

export const commonEntityBrowserQuestions: StudioTemplateProperty[] = [
  entityQuestion,
  createComponentNameQuestion({defaultValue: 'List'}),
  createBrowserTypeQuestion(),
  createQueryQuestion(),
  menuItemQuestion,
];

export const allQuestions: StudioTemplateProperty[] = [
  ...commonEntityBrowserQuestions,
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<EntityBrowserAnswers> => {
  const initialQuestions = [
    ...commonEntityBrowserQuestions
  ];

  const answers: EntityBrowserAnswers = await askQuestions<EntityBrowserAnswers>(initialQuestions, projectModel, gen);

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
};