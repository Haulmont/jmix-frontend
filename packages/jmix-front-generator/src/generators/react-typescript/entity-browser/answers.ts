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

export type BrowserTypes = 'table' | 'list' | 'cards';

export const browserTypeQuestion = {
  code: 'browserType',
  caption: 'Browser type',
  propertyType: StudioTemplatePropertyType.OPTION,
  defaultValue: "Cards",
  required: true,
  options: ['table', 'cards', 'list']
};

export const commonEntityBrowserQuestions: StudioTemplateProperty[] = [
  {
    code: 'entity',
    caption: 'Entity',
    propertyType: StudioTemplatePropertyType.ENTITY,
    required: true
  },
  {
    code: 'componentName',
    caption: 'Component name',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: "List",
    required: true
  },
  browserTypeQuestion,
  {
    code: 'query',
    // Subject to change, in future we might want to get the full query from Studio
    caption: 'GraphQL query for entity browser',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    relatedProperty: "entity",
    required: true
  }
];

export interface EntityBrowserAnswers extends StringIdAnswers {
  entity: EntityWithPath;
  browserType: BrowserTypes;
  componentName: string;
  query: string;
}

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