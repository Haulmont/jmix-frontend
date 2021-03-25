import {CommonGenerationOptions} from "../../../common/cli-options";
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {EntityWithPath} from "../../../building-blocks/stages/template-model/pieces/entity";
import {askStringIdQuestions, StringIdAnswers, stringIdQuestions} from "../../../building-blocks/stages/answers/pieces/stringId";
import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import { isStringIdEntity } from "../common/entity";

export interface FormStepConfig {
  name: string;
  fieldNames: string[];
}

export interface Answers extends StringIdAnswers {
  entity: EntityWithPath;
  componentName: string;
  query: string;
  steps: Array<FormStepConfig>;
  menuItem: null;
}

const questionsToBeAsked = [
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
    defaultValue: 'Edit',
    required: true
  },
  {
    code: 'query',
    caption: 'GraphQL query',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    relatedProperty: "entity",
    required: true
  }
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
