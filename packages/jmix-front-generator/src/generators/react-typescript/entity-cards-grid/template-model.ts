import {Entity, EntityAttribute, ProjectModel} from "../../../common/model/cuba-model";
import {CommonTemplateModel} from "../../../building-blocks/stages/template-model/pieces/common";
import {Answers, CardsInRowOption} from "./answers";
import {Options} from "./options";
import {deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {stringIdAnswersToModel} from '../common/base-entity-screen-generator';
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { templateUtilities, UtilTemplateModel } from "../../../building-blocks/stages/template-model/pieces/util";
import { getDisplayedAttributesFromQuery } from "../../../building-blocks/stages/template-model/pieces/getDisplayedAttributesFromQuery";
import { ScreenType } from "../common/entity";

export interface TemplateModel extends
CommonTemplateModel,
UtilTemplateModel {
  entity: Entity;
  cardsInRow: number;
  stringIdName?: string;
  query: string;
  attributes: EntityAttribute[];
}

const mapperCardsInRowOptionToNumber: Record<CardsInRowOption, number> = {
  "2 columns": 2,
  "3 columns": 3,
  "4 columns": 4
}

export async function deriveTemplateModel(
  answers: Answers, projectModel: ProjectModel, gen: YeomanGenerator, options: Options
): Promise<TemplateModel> {

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
    cardsInRow: mapperCardsInRowOptionToNumber[answers.cardsInRow],
    attributes,
    stringIdName,
    ...deriveEntityCommon(options, answers),
    ...templateUtilities,
  }
}
