import {Entity, EntityAttribute, ProjectModel} from "../../../common/model/cuba-model";
import {CommonTemplateModel} from "../../../building-blocks/stages/template-model/pieces/common";
import {Answers, CardsInRowOption} from "./answers";
import {Options} from "./options";
import {elementNameToClass, normalizeRelativePath, unCapitalizeFirst} from "../../../common/utils";
import {stringIdAnswersToModel} from '../common/base-entity-screen-generator';
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { templateUtilities, UtilTemplateModel } from "../../../building-blocks/stages/template-model/pieces/util";
import { getDisplayedAttributesFromQuery } from "../../../building-blocks/stages/template-model/pieces/getDisplayedAttributesFromQuery";
import { ScreenType } from "../common/entity";

export interface TemplateModel extends
CommonTemplateModel,
UtilTemplateModel {
  nameLiteral: string;
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

  const className = elementNameToClass(answers.componentName);
  const relDirShift = normalizeRelativePath(options.dirShift);
  const nameLiteral = unCapitalizeFirst(className);

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
    ...templateUtilities,
    componentName: answers.componentName,
    className,
    nameLiteral,
    relDirShift,
    query: answers.query,
    entity: answers.entity,
    cardsInRow: mapperCardsInRowOptionToNumber[answers.cardsInRow],
    attributes,
    stringIdName
  }
}
