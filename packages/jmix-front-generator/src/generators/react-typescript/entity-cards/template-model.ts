import {Entity, ProjectModel, EntityAttribute} from "../../../common/model/cuba-model";
import {CommonTemplateModel} from "../../../building-blocks/stages/template-model/pieces/common";
import {Answers} from "./answers";
import {Options} from "./options";
import {elementNameToClass, normalizeRelativePath, unCapitalizeFirst} from "../../../common/utils";
import {stringIdAnswersToModel} from '../common/base-entity-screen-generator';
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { templateUtilities, UtilTemplateModel } from "../../../building-blocks/stages/template-model/pieces/util";
import { ScreenType } from "../../../generators/react-typescript/common/entity";
import { getDisplayedAttributesFromQuery } from "../../../building-blocks/stages/template-model/pieces/getDisplayedAttributesFromQuery";

export interface TemplateModel extends
CommonTemplateModel,
UtilTemplateModel {
  nameLiteral: string;
  entity: Entity;
  stringIdName?: string;
  query: string;
  attributes: EntityAttribute[];
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
    entity: answers.entity,
    query: answers.query,
    attributes,
    stringIdName
  }
}