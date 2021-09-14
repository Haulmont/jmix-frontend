import {Entity, EntityAttribute, ProjectModel} from "../../../common/model/cuba-model";
import {CommonTemplateModel} from "../../../building-blocks/stages/template-model/pieces/common";
import {CalendarAnswers} from "./answers";
import {Options} from "./options";
import {deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {stringIdAnswersToModel} from '../common/base-entity-screen-generator';
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { templateUtilities, UtilTemplateModel } from "../../../building-blocks/stages/template-model/pieces/util";
import { getDisplayedAttributesFromQuery } from "../../../building-blocks/stages/template-model/pieces/getDisplayedAttributesFromQuery";
import { ScreenType } from "../../../building-blocks/stages/template-model/pieces/entity";

export interface CalendarTemplateModel extends
CommonTemplateModel,
UtilTemplateModel {
  entity: Entity;
  eventStartAttr: string;
  eventEndAttr: string;
  titleAttr: string;
  descriptionAttrAnswer: string;
  stringIdName?: string;
  query: string;
  attributes: EntityAttribute[];
}

export async function deriveCalendarTemplateModel(
  answers: CalendarAnswers, projectModel: ProjectModel, gen: YeomanGenerator, options: Options
): Promise<CalendarTemplateModel> {

  const displayedAttributes = getDisplayedAttributesFromQuery({
    entity: answers.entity,
    query: answers.query,
    screenType: ScreenType.BROWSER,
  }, projectModel);

  const { stringIdName, listAttributes: attributes } = stringIdAnswersToModel(
    answers,
    projectModel,
    answers.entity,
    displayedAttributes
  );

  return {
    query: answers.query,
    entity: answers.entity,
    eventStartAttr: answers.eventStartAttr,
    eventEndAttr: answers.eventEndAttr,
    titleAttr: answers.titleAttr,
    descriptionAttrAnswer: answers.descriptionAttrAnswer,
    attributes,
    stringIdName,
    ...deriveEntityCommon(options, answers),
    ...templateUtilities,
  }
}
