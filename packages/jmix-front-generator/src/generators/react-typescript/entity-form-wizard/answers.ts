import {CommonGenerationOptions} from "../../../common/cli-options";
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {askStringIdQuestions, StringIdAnswers} from "../../../building-blocks/stages/answers/pieces/stringId";
import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import { isStringIdEntity } from "../../../building-blocks/stages/template-model/pieces/entity";
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

export interface FormWizardAnswers extends
StringIdAnswers,
EntityAnswer,
ComponentNameAnswer,
QueryAnswer,
MenuItemAnswer {
  steps: number;
}

const formWizardStepsQuestion: StudioTemplateProperty = {
  code: 'steps',
  caption: 'Number of steps',
  propertyType: StudioTemplatePropertyType.INTEGER,
  required: true,
}

export const formWizardQuestions: StudioTemplateProperty[] = [
  entityQuestion,
  formWizardStepsQuestion,
  createComponentNameQuestion({
    defaultValue: 'FormWizard',
  }),
  createQueryQuestion(),
  menuItemQuestion
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<FormWizardAnswers> => {
  const initialQuestions = [
    ...formWizardQuestions,
  ];

  const answers: FormWizardAnswers = await askQuestions<FormWizardAnswers>(initialQuestions, projectModel, gen);

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
