import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {ProjectModel, View} from "../../../common/model/cuba-model";
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

export interface EntityEditorAnswers extends StringIdAnswers {
  entity: EntityWithPath,
  componentName: string,
  query: string,
  menuItem: string | null
}


export const commonEntityEditorQuestions: StudioTemplateProperty[] = [
  {
    code: 'entity',
    caption: 'Entity',
    propertyType: StudioTemplatePropertyType.ENTITY,
    required: true
  },
  {
    code: 'componentName',
    caption: 'Edit component name',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'Edit',
    required: true
  },
  {
    code: 'query',
    // Subject to change, in future we might want to get the full query from Studio
    caption: 'GraphQL query for entity editor',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    relatedProperty: "entity",
    required: true
  },
  {
    caption: "Menu item",
    code: "menuItem",
    propertyType: StudioTemplatePropertyType.MENU_ITEM,
    required: false
  },
];


export const allQuestions: StudioTemplateProperty[] = [
  ...commonEntityEditorQuestions // TODO merge with commonEntityManagementQuestions once REST API is removed
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<EntityEditorAnswers> => {
  const initialQuestions = [
    ...commonEntityEditorQuestions
  ];

  const answers: EntityEditorAnswers = await askQuestions<EntityEditorAnswers>(initialQuestions, projectModel, gen);

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