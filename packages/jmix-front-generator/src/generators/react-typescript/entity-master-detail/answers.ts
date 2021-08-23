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
import {isStringIdEntity} from "../../../common/entity";
import {
  entityQuestion,
  EntityAnswer,
  menuItemQuestion,
  MenuItemAnswer,
  createComponentNameQuestion,
  createQueryQuestion,
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";
import { createBrowserTypeQuestion } from "../entity-browser/answers";

export interface EntityMasterDetailAnswers extends
EntityAnswer,
MenuItemAnswer,
StringIdAnswers {
  masterDetailComponentName: string;

  editorComponentName: string;
  editorQuery: string;

  browserComponentName: string;
  browserQuery: string;
}

export const commonEntityMasterDetailQuestions: StudioTemplateProperty[] = [
  entityQuestion,
  menuItemQuestion,
  createComponentNameQuestion({
    code: 'masterDetailComponentName',
    caption: 'Master Detail component name',
    defaultValue: 'MasterDetail',
    step: {
      name: "Master Detail",
      order: "1"
    }
  }),
  createComponentNameQuestion({
    code: 'browserComponentName',
    caption: 'Browser component name',
    defaultValue: "List",
    step: {
      name: "Entity Browser",
      order: "2"
    }
  }),
  createQueryQuestion({
    code: 'browserQuery',
    // Subject to change, in future we might want to get the full query from Studio
    caption: 'GraphQL query for entity browser',
    relatedProperty: "entity",
    required: true,
    step: {
      name: "Entity Browser",
      order: "2"
    }
  }),
  createComponentNameQuestion({
    code: 'editorComponentName',
    caption: 'Editor component name',
    defaultValue: 'Editor',
    step: {
      name: "Entity Editor",
      order: "3"
    }
  }),
  createQueryQuestion({
    code: 'editorQuery',
    // Subject to change, in future we might want to get the full query from Studio
    caption: 'GraphQL query for entity editor',
    relatedProperty: "entity",
    required: true,
    step: {
      name: "Entity Editor",
      order: "3"
    }
  }),
];


export const allQuestions: StudioTemplateProperty[] = [
  ...commonEntityMasterDetailQuestions // TODO merge with commonEntityManagementQuestions once REST API is removed
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<EntityMasterDetailAnswers> => {
  const initialQuestions = [
    ...commonEntityMasterDetailQuestions
  ];

  const answers: EntityMasterDetailAnswers = await askQuestions<EntityMasterDetailAnswers>(initialQuestions, projectModel, gen);

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