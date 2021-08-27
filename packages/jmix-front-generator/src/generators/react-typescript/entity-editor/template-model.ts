import {EntityAttribute, ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {
  deriveEntityCommon,
  CommonTemplateModel,
} from "../../../building-blocks/stages/template-model/pieces/common";
import {
  deriveEditorTemplateModel as HelperderiveEditorTemplateModel,
  EntityEditorTemplateModel as BaseEntityEditorTemplateModel,
} from "../../../building-blocks/stages/template-model/pieces/editor";
import {
  deriveEntity,
  EntityTemplateModel,
} from "../../../building-blocks/stages/template-model/pieces/entity";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {EntityEditorAnswers} from "./answers";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import { ScreenType } from "../../../building-blocks/stages/template-model/pieces/entity";
import { getDisplayedAttributesFromQuery } from "../../../building-blocks/stages/template-model/pieces/getDisplayedAttributesFromQuery";

export type EntityEditorTemplateModel =
  CommonTemplateModel
  & UtilTemplateModel
  & BaseEntityEditorTemplateModel
  & EntityTemplateModel
  & {
  attributes: EntityAttribute[];
  query: string;
  associatedEntityClassNames: string[];
  stringIdName?: string;
};

export const deriveEditorTemplateModel = async (
  answers: EntityEditorAnswers, projectModel: ProjectModel, gen: YeomanGenerator, options: ComponentOptions
): Promise<EntityEditorTemplateModel> => {
  const attributes = getDisplayedAttributesFromQuery({
    entity: answers.entity,
    query: answers.query,
    screenType: ScreenType.EDITOR,
  }, projectModel);

  return {
    attributes,
    query: answers.query,
    ...deriveEntity(answers, projectModel),
    ...deriveEntityCommon(options, answers),
    ...HelperderiveEditorTemplateModel(answers, projectModel, attributes),
    // ...deriveStringIdAnswers(answers, projectModel, listAttributes, editAttributes), // TODO A different implementation is needed for GraphQL
    ...templateUtilities
  }
};
