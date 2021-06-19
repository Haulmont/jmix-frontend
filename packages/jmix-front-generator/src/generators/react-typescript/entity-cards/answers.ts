

import {EntityWithPath} from "../../../building-blocks/stages/template-model/pieces/entity";
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {askStringIdQuestions, StringIdAnswers} from "../../../building-blocks/stages/answers/pieces/stringId";
import { isStringIdEntity } from "../common/entity";

export interface Answers extends StringIdAnswers {
  componentName: string;
  entity: EntityWithPath;
  query: string;
  menuItem: string | null;
}

const entityCardsQuestions: StudioTemplateProperty[] = [
  {
    caption: "Entity",
    code: "entity",
    propertyType: StudioTemplatePropertyType.ENTITY,
    required: true
  },
  {
    caption: "Component class name",
    code: "componentName",
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: "Cards",
    required: true
  },
  {
    code: 'query',
    caption: 'GraphQL query',
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

const questionsToBeAskedInCLI = [
  ...entityCardsQuestions
];

export const allQuestions: StudioTemplateProperty[] = [
  ...questionsToBeAskedInCLI
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, options: CommonGenerationOptions
): Promise<Answers> => {  
  const answers = await askQuestions<Answers>(questionsToBeAskedInCLI, projectModel, gen);
  
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
