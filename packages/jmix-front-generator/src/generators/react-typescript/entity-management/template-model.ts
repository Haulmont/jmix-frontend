import {CommonTemplateModel} from "../../../building-blocks/stages/template-model/pieces/common";
import {EntityAttribute, ProjectModel} from "../../../common/model/cuba-model";
import {ListTypes} from "../../../building-blocks/stages/template-model/pieces/entity-management/list-types";
import {
  deriveEntity,
  EntityTemplateModel,
  EntityWithPath
} from "../../../building-blocks/stages/template-model/pieces/entity";
import {Answers} from "./answers";
import {Options} from "./options";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";

import {
  deriveEntityManagementCommon,
  EntityManagementCommonTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/entity-management/common";
import {
  deriveEditAttributesFromView,
  EditAttributesTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/entity-management/edit-attributes";
import {
  deriveViewBasedBrowserTemplateModel,
  ListAttributesTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/entity-browser/browser";
import {deriveEditorTemplateModel} from "../../../building-blocks/stages/template-model/pieces/entity-management/editor";

export interface EditRelations {
  [propName: string]: EntityWithPath
}

export interface EditRelationsSplit {
  editAssociations: EditRelations;
  editCompositions: EditRelations;
}

export interface RelationImport {
  className: string
  path: string
}

export type TemplateModel = CommonTemplateModel & {
  listComponentClass: string;
  editComponentClass: string;
  listType: ListTypes;
  nameLiteral: string;
  entity: EntityWithPath;
  listAttributes: EntityAttribute[];
  stringIdName?: string;
  editAttributes: EntityAttribute[];
  readOnlyFields: string[];
  editCompositions: EditRelations;
  editAssociations: EditRelations;
  nestedEntityInfo?: Record<string, string>;
  relationImports: RelationImport[];
};

export const deriveTemplateModel = async (
  answers: Answers, projectModel: ProjectModel, gen: YeomanGenerator, options: Options
): Promise<TemplateModel> => {

  type PartialModel =
    & EntityTemplateModel
    & EntityManagementCommonTemplateModel<ListTypes>
    & ListAttributesTemplateModel
    & EditAttributesTemplateModel;

  const partialModel: PartialModel = {
    ...deriveEntity(answers, projectModel),
    ...deriveEntityManagementCommon(options, answers),
    ...deriveViewBasedBrowserTemplateModel(answers, projectModel),
    ...deriveEditAttributesFromView(answers, projectModel)
  };

  const {editAttributes, entity: entityWithPath} = partialModel;

  return {
    ...partialModel,
    ...deriveEditorTemplateModel(answers, projectModel, editAttributes, entityWithPath)
  };
}
