import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {EntityWithPath} from "../../../building-blocks/stages/template-model/pieces/entity";
import {
  askStringIdQuestions,
  StringIdAnswers,
  stringIdQuestions
} from "../../../building-blocks/stages/answers/pieces/stringId";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {isStringIdEntity} from "../common/entity";

export interface EntityMasterDetailAnswers extends StringIdAnswers {
  entity: EntityWithPath;

  masterDetailComponentName: string;

  editorComponentName: string;
  editorQuery: string;

  browserComponentName: string;
  browserQuery: string;

  menuItem: string | null;
}

export const commonEntityMasterDetailQuestions: StudioTemplateProperty[] = [
  {
    code: 'entity',
    caption: 'Entity',
    propertyType: StudioTemplatePropertyType.ENTITY,
    required: true
  },
  {
    code: 'masterDetailComponentName',
    caption: 'Master Detail component name',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'MasterDetail',
    required: true
  },
  {
    code: 'editorComponentName',
    caption: 'Editor component name',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'Editor',
    required: true
  },
  {
    code: 'editorQuery',
    // Subject to change, in future we might want to get the full query from Studio
    caption: 'GraphQL query for entity editor',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    relatedProperty: "entity",
    required: true
  },
  {
    code: 'browserComponentName',
    caption: 'Browser component name',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: "List",
    required: true
  },
  {
    code: 'browserQuery',
    // Subject to change, in future we might want to get the full query from Studio
    caption: 'GraphQL query for entity browser',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    relatedProperty: "entity",
    required: true
  },
  {
    caption: "Menu item",
    code: "menuItem",
    propertyType: StudioTemplatePropertyType.MENU_ITEM,
    required: true
  },
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