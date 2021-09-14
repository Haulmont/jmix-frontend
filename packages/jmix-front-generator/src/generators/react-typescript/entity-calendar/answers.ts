import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import { askStringIdQuestions, StringIdAnswers } from "../../../building-blocks/stages/answers/pieces/stringId";
import { isStringIdEntity } from "../../../building-blocks/stages/template-model/pieces/entity";
import {
  entityQuestion,
  EntityAnswer,
  createComponentNameQuestion,
  ComponentNameAnswer,
  createQueryQuestion,
  QueryAnswer,
  menuItemQuestion,
  MenuItemAnswer,
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";

const titleAttrAnswer: StudioTemplateProperty = {
  caption: "Title attribute",
  code: "titleAttr",
  propertyType: StudioTemplatePropertyType.ATTRIBUTE,
  required: true,
  relatedProperty: 'query',
  step: {
    name: 'Select query attribures',
    order: '2',
  }
};

const descriptionAttrAnswer: StudioTemplateProperty = {
  caption: "Description attribute",
  code: "descriptionAttr",
  propertyType: StudioTemplatePropertyType.ATTRIBUTE,
  required: true,
  relatedProperty: 'query',
  step: {
    name: 'Select query attribures',
    order: '2',
  }
};

const eventStartAttrAnswer: StudioTemplateProperty = {
  caption: "Event start attribute",
  code: "eventStartAttr",
  propertyType: StudioTemplatePropertyType.ATTRIBUTE,
  required: true,
  relatedProperty: 'query',
  step: {
    name: 'Select query attribures',
    order: '2',
  }
};

const eventEndAttrAnswer: StudioTemplateProperty = {
  caption: "Event end attribute",
  code: "eventEndAttr",
  propertyType: StudioTemplatePropertyType.ATTRIBUTE,
  required: true,
  relatedProperty: 'query',
  step: {
    name: 'Select query attribures',
    order: '2',
  }
};

export interface CalendarAnswers extends
EntityAnswer,
ComponentNameAnswer,
QueryAnswer,
MenuItemAnswer,
StringIdAnswers {
  eventStartAttr: string;
  eventEndAttr: string;
  titleAttr: string;
  descriptionAttrAnswer: string;
}

export const calendarQuestions: StudioTemplateProperty[] = [
  entityQuestion,
  createComponentNameQuestion({defaultValue: 'Calendar'}),
  menuItemQuestion,
  createQueryQuestion({step: {
    name: 'Select query',
    order: '1',
  }}),
  titleAttrAnswer,
  descriptionAttrAnswer,
  eventStartAttrAnswer,
  eventEndAttrAnswer,
];

const questionsToBeAskedInCLI = [
  ...calendarQuestions
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<CalendarAnswers> => {  
  const answers = await askQuestions<CalendarAnswers>(questionsToBeAskedInCLI, projectModel, gen);
  
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
