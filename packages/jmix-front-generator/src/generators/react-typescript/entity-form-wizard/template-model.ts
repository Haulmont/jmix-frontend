import {CommonTemplateModel, deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {EntityAttribute, ProjectModel} from "../../../common/model/cuba-model";
import {
  deriveEntity,
  EntityWithPath
} from "../../../building-blocks/stages/template-model/pieces/entity";
import {FormWizardAnswers, FormStepConfig} from "./answers";
import {Options} from "./options";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { templateUtilities, UtilTemplateModel } from "../../../building-blocks/stages/template-model/pieces/util";
import { ScreenType } from "../common/entity";
import { EntityEditorTemplateModel, deriveEditorTemplateModel } from "../../../building-blocks/stages/template-model/pieces/editor";
// import {deriveEditAssociatedEntityClassNames} from '../entity-management/template-model'
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
  steps: Array<FormStepConfig & FormEditorTemplateModel>
  associatedEntityClassNames: string[];
  stringIdName?: string;
};

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
    menuItem: null,
    ...deriveEntity(answers, projectModel),
    ...deriveEntityCommon(options, answers),
    ...templateUtilities
  };
}

const deriveSteps = (
  answers: FormWizardAnswers, projectModel: ProjectModel, attributes: EntityAttribute[]
): {steps: Array<FormStepConfig & FormEditorTemplateModel>} => {
  return {
    steps: answers.steps.map((step) => {
      const stepAttributes = attributes.filter(({name}) => step.fieldNames.includes(name));

      return {
        ...step,
        ...deriveEditorTemplateModel(answers, projectModel, stepAttributes),
        attributes: stepAttributes,
      };
    })
  }
}
