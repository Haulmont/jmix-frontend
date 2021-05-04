import {EntityWithPath} from "../../../building-blocks/stages/template-model/pieces/entity";
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import { askStringIdQuestions, StringIdAnswers } from "../../../building-blocks/stages/answers/pieces/stringId";
import { isStringIdEntity } from "../common/entity";

export type CardsInRowOption =
  "2 columns"
  | "3 columns"
  | "4 columns"

const cardsInRowOptions: CardsInRowOption[] = ["2 columns", "3 columns", "4 columns"];

export interface Answers extends StringIdAnswers {
  componentName: string;
  entity: EntityWithPath;
  cardsInRow: CardsInRowOption;
  query: string;
}

const entityCardsGridQuestions: StudioTemplateProperty[] = [
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
    defaultValue: "CardsGrid",
    required: true
  },
  {
    caption: "Select the number of cards in a row",
    code: "cardsInRow",
    propertyType: StudioTemplatePropertyType.OPTION,
    required: true,
    options: cardsInRowOptions
  },
  {
    code: 'query',
    caption: 'GraphQL query',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    relatedProperty: "entity",
    required: true
  }
];

const questionsToBeAskedInCLI = [
  ...entityCardsGridQuestions
];

export const allQuestions: StudioTemplateProperty[] = [
  ...questionsToBeAskedInCLI,
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
