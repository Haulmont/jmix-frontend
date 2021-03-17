

import {EntityWithPath} from "../../../building-blocks/stages/template-model/pieces/entity";
import {ProjectModel, View} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";

export type Answers = {
  componentName: string;
  entityView: View;
  entity: EntityWithPath;
  listShowIdAttr?: boolean;
  listIdAttrPos?: number;
  editIdAttrPos?: number;
  idAttrName?: string; // Will be asked for if not found in project model
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

const listShowIdQuestions = [
  {
    code: 'listShowIdAttr',
    caption: 'Show ID attribute in the component?',
    propertyType: StudioTemplatePropertyType.BOOLEAN,
    required: true
  }
];

const listIdPositionQuestions = [
  {
    code: 'listIdAttrPos',
    caption: 'Position of the ID attribute in the card \n' +
      '(behaves like an array index, e.g. enter 0 for the ID to appear as the first row, \n' +
      '-1 for next-to-last, etc.).',
    propertyType: StudioTemplatePropertyType.INTEGER,
    required: true
  }
];

export const allQuestions: StudioTemplateProperty[] = [
  ...entityCardsQuestions,
  ...listShowIdQuestions,
  ...listIdPositionQuestions
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, options: CommonGenerationOptions
): Promise<Answers> => {
  
  const initialQuestions = [
    ...entityCardsQuestions
  ];
  
  let answers = await askQuestions<Answers>(initialQuestions, projectModel, gen);
  return answers;
}
