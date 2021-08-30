import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {
  askStringIdQuestions,
  StringIdAnswers,
} from "../../../building-blocks/stages/answers/pieces/stringId";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
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

export interface CardsWithDetailsAnswers extends 
EntityAnswer,
ComponentNameAnswer,
QueryAnswer,
MenuItemAnswer,
StringIdAnswers {
  mainFields: string[];
}

const mainFieldsQuestion: StudioTemplateProperty = {
  code: 'mainFields',
  caption: 'Main Fields',
  propertyType: StudioTemplatePropertyType.ATTRIBUTES_ARRAY,
  required: true
}

const cardsWithDetailsQuestions: StudioTemplateProperty[] = [
  entityQuestion,
  createComponentNameQuestion({defaultValue: 'CardsWithDetails'}),
  createQueryQuestion(),
  mainFieldsQuestion,  
  menuItemQuestion,
];

export const allQuestions: StudioTemplateProperty[] = [
  ...cardsWithDetailsQuestions,
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<CardsWithDetailsAnswers> => {
  const initialQuestions = [
    ...cardsWithDetailsQuestions
  ];

  const answers: CardsWithDetailsAnswers = await askQuestions<CardsWithDetailsAnswers>(initialQuestions, projectModel, gen);

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