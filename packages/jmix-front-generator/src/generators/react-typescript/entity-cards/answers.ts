

import {EntityWithPath} from "../../../building-blocks/stages/template-model/pieces/entity";
import {ProjectModel, View} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {askStringIdQuestions, StringIdAnswers} from "../../../building-blocks/stages/answers/pieces/stringId";
import { isStringIdEntity } from "../common/entity";

export interface Answers extends StringIdAnswers {
  componentName: string,
  entityView: View,
  entity: EntityWithPath
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
    caption: "Entity view",
    code: "entityView",
    propertyType: StudioTemplatePropertyType.VIEW,
    relatedProperty: "entity",
    required: true
  }
];


export const allQuestions: StudioTemplateProperty[] = [
  ...entityCardsQuestions
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, options: CommonGenerationOptions
): Promise<Answers> => {
  
  const initialQuestions = [
    ...entityCardsQuestions
  ];
  
  let answers: Answers = await askQuestions<Answers>(initialQuestions, projectModel, gen);
  let stringIdAnswers: StringIdAnswers = isStringIdEntity(projectModel, answers.entity) 
  ? await askStringIdQuestions(
      answers.entity,
      projectModel,
      gen
    )
  : {}

  return {...answers, ...stringIdAnswers};
}
