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

export interface TableWithFiltersAnswers extends 
EntityAnswer,
ComponentNameAnswer,
QueryAnswer,
MenuItemAnswer,
StringIdAnswers {
  filterableFields: string[];
}

const filterableFieldsQuestion: StudioTemplateProperty = {
  code: 'filterableFields',
  caption: 'Filterable Fields',
  propertyType: StudioTemplatePropertyType.ATTRIBUTES_ARRAY,
  required: true
}

export const tableWithFiltersQuestions: StudioTemplateProperty[] = [
  entityQuestion,
  createComponentNameQuestion({defaultValue: 'TableWithFilters'}),
  createQueryQuestion(),
  filterableFieldsQuestion,  
  menuItemQuestion,
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<TableWithFiltersAnswers> => {
  const initialQuestions = [
    ...tableWithFiltersQuestions
  ];

  const answers: TableWithFiltersAnswers = await askQuestions<TableWithFiltersAnswers>(initialQuestions, projectModel, gen);

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