import {CommonTemplateModel, deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {EntityAttribute, ProjectModel} from "../../../common/model/cuba-model";
import {
  deriveEntity,
  EntityWithPath
} from "../../../building-blocks/stages/template-model/pieces/entity";
import {FormWizardAnswers} from "./answers";
import {Options} from "./options";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { templateUtilities, UtilTemplateModel } from "../../../building-blocks/stages/template-model/pieces/util";
import { ScreenType } from "../../../building-blocks/stages/template-model/pieces/entity";
import { EntityEditorTemplateModel, deriveEditorTemplateModel } from "../../../building-blocks/stages/template-model/pieces/editor";
import { getDisplayedAttributesFromQuery } from "../../../building-blocks/stages/template-model/pieces/getDisplayedAttributesFromQuery";

interface FormEditorTemplateModel extends
EntityEditorTemplateModel {
  attributes: EntityAttribute[];
}

export interface TemplateModel extends
CommonTemplateModel,
UtilTemplateModel,
FormEditorTemplateModel {
  nameLiteral: string;
  entity: EntityWithPath;
  query: string;
  steps: Array<FormEditorTemplateModel>
  associatedEntityClassNames: string[];
  stringIdName?: string;
}

export const deriveTemplateModel = async (
  answers: FormWizardAnswers, projectModel: ProjectModel, gen: YeomanGenerator, options: Options
): Promise<TemplateModel> => {

  const displayedAttributes = getDisplayedAttributesFromQuery({
    entity: answers.entity,
    query: answers.query,
    screenType: ScreenType.EDITOR,
  }, projectModel);

  const {steps} = deriveSteps(answers, projectModel, displayedAttributes);

  const {
    associations,
    compositions,
    nestedEntityInfo,
    readOnlyFields,
    relationImports,
    associatedEntityClassNames
  } = deriveEditorTemplateModel(answers, projectModel, displayedAttributes);

  return {
    query: answers.query,
    steps,
    attributes: displayedAttributes,
    associations,
    associatedEntityClassNames,
    compositions,
    readOnlyFields,
    relationImports,
    nestedEntityInfo,
    ...deriveEntity(answers, projectModel),
    ...deriveEntityCommon(options, answers),
    ...templateUtilities
  };
}

const countItemsInSteps = <T>(arr: T[], numberOfSteps: number) => {
  const counterItemsInSteps: number[] = new Array(numberOfSteps).fill(0);

  const countItemsInSteps = arr.reduce((acc, _, index) => {
    acc[index % numberOfSteps] = acc[index % numberOfSteps] + 1;
    return acc;
  }, counterItemsInSteps);
  return countItemsInSteps;
}

export const splitBySteps = <T>(arr: T[], numberOfSteps: number): T[][] => {
  const itemAmountInSteps = countItemsInSteps(arr, numberOfSteps);

  const arrBySteps = itemAmountInSteps.map((counter, index) => {
    const startIndex = itemAmountInSteps
      .slice(0, index)
      .reduce((acc, counter) => acc + counter, 0);

    return arr.slice(startIndex, startIndex + counter)
  });

  return arrBySteps;
}

const deriveSteps = (
  answers: FormWizardAnswers, projectModel: ProjectModel, attributes: EntityAttribute[]
): {steps: Array<FormEditorTemplateModel>} => {
  const attributesBySteps = splitBySteps(attributes, answers.steps);

  return {
    steps: attributesBySteps.map(attributes => ({
      ...deriveEditorTemplateModel(answers, projectModel, attributes),
      attributes
    }))
  }
}
