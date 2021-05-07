import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import {ProjectModel, View} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {EntityWithPath} from "../../../building-blocks/stages/template-model/pieces/entity";
import {ListTypes} from "../../../building-blocks/stages/template-model/pieces/entity-management/list-types";
import {
  askStringIdQuestions,
  StringIdAnswers,
  stringIdQuestions
} from "../../../building-blocks/stages/answers/pieces/stringId";
import {
  commonEntityManagementQuestions,
  displayAttributesQuestions
} from "../../../building-blocks/stages/answers/pieces/entity-management/entity-management-common";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {isStringIdEntity} from "../common/entity";

export interface EntityManagementAnswers extends StringIdAnswers {
  entity: EntityWithPath,
  managementComponentName: string,
  listType: ListTypes,
  listComponentName: string,
  editComponentName: string,
  listQuery: string,
  editQuery: string,
}

export const allQuestions: StudioTemplateProperty[] = [
  ...commonEntityManagementQuestions,
  ...displayAttributesQuestions // TODO merge with commonEntityManagementQuestions once REST API is removed
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<EntityManagementAnswers> => {
  const initialQuestions = [
    ...commonEntityManagementQuestions,
    ...displayAttributesQuestions
  ];

  const answers: EntityManagementAnswers = await askQuestions<EntityManagementAnswers>(initialQuestions, projectModel, gen);

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