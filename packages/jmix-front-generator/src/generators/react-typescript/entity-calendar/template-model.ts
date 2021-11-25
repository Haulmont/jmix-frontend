import {EntityAttribute, ProjectModel} from "../../../common/model/cuba-model";
import {CommonTemplateModel} from "../../../building-blocks/stages/template-model/pieces/common";
import {CalendarAnswers} from "./answers";
import {Options} from "./options";
import {deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {
  deriveEntity,
  EntityWithPath
} from "../../../building-blocks/stages/template-model/pieces/entity";
import {stringIdAnswersToModel} from '../common/base-entity-screen-generator';
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { templateUtilities, UtilTemplateModel } from "../../../building-blocks/stages/template-model/pieces/util";
import { getDisplayedAttributesFromQuery } from "../../../building-blocks/stages/template-model/pieces/getDisplayedAttributesFromQuery";
import { ScreenType } from "../../../building-blocks/stages/template-model/pieces/entity";

export interface CalendarTemplateModel extends
CommonTemplateModel,
UtilTemplateModel {
  entity: EntityWithPath;
  eventStartAttr: string;
  eventEndAttr: string;
  titleAttr: string;
  descriptionAttr: string;
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
    eventStartAttr: answers.eventStartAttr,
    eventEndAttr: answers.eventEndAttr,
    titleAttr: answers.titleAttr,
    descriptionAttr: answers.descriptionAttr,
    attributes,
    stringIdName,
    ...deriveEntity(answers, projectModel),
    ...deriveEntityCommon(options, answers),
    ...templateUtilities,
  }
}
