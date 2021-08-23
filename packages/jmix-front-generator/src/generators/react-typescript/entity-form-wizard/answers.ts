import {CommonGenerationOptions} from "../../../common/cli-options";
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {askStringIdQuestions, StringIdAnswers, stringIdQuestions} from "../../../building-blocks/stages/answers/pieces/stringId";
import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import { isStringIdEntity } from "../../../common/entity";
import {
  ComponentNameAnswer,
  createComponentNameQuestion,
  EntityAnswer,
  entityQuestion,
  QueryAnswer,
  createQueryQuestion,
  MenuItemAnswer,
  menuItemQuestion
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";

export interface FormStepConfig {
  name: string;
  fieldNames: string[];
}

export interface Answers extends
StringIdAnswers,
EntityAnswer,
ComponentNameAnswer,
QueryAnswer,
MenuItemAnswer {
  steps: Array<FormStepConfig>;
}

const questionsToBeAsked = [
  entityQuestion,
  createComponentNameQuestion({
    defaultValue: 'FormWizard',
  }),
  createQueryQuestion(),
  menuItemQuestion
]

export const allQuestions: StudioTemplateProperty[] = [
  ...questionsToBeAsked,
  {
    code: 'steps',
    caption: 'Steps',
    propertyType: StudioTemplatePropertyType.OPTION,
    required: true
  }
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, options: CommonGenerationOptions
): Promise<Answers> => {
  const initialQuestions = [
    ...questionsToBeAsked,
  ];

  const answers: Answers = await askQuestions<Answers>(initialQuestions, projectModel, gen);

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
