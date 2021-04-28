import {CommonTemplateModel} from "../../../building-blocks/stages/template-model/pieces/common";
import {EntityAttribute, ProjectModel} from "../../../common/model/cuba-model";
import {ListTypes} from "../../../building-blocks/stages/template-model/pieces/entity-management/list-types";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {
  deriveEntityManagementCommon,
  EntityManagementCommonTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/entity-management/common";
import {
  deriveEditAttributesFromQuery,
  EditAttributesTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/entity-management/edit-attributes";
import {
  deriveListAttributesFromQuery,
  ListAttributesTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/entity-browser/browser";
import {
  deriveEditorTemplateModel,
  EditRelations, EntityEditorTemplateModel, RelationImport
} from "../../../building-blocks/stages/template-model/pieces/entity-management/editor";
import {
  deriveEntity,
  EntityTemplateModel,
  EntityWithPath
} from "../../../building-blocks/stages/template-model/pieces/entity";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {EntityManagementAnswers} from "./answers";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

export type EntityManagementQueryTemplateModel = {
  listQuery: string;
  editQuery: string;
};

export type EntityManagementTemplateModel =
  CommonTemplateModel
  & UtilTemplateModel
  & EntityManagementQueryTemplateModel
  & {
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
  editAssociatedEntityClassNames: string[];
  relationImports: RelationImport[];
};

export const deriveTemplateModel = async (
  answers: EntityManagementAnswers, projectModel: ProjectModel, gen: YeomanGenerator, options: ComponentOptions
): Promise<EntityManagementTemplateModel> => {

  type PartialModel =
    & EntityTemplateModel
    & EntityManagementCommonTemplateModel<ListTypes>
    & EntityManagementQueryTemplateModel
    & ListAttributesTemplateModel
    & EditAttributesTemplateModel;

  const partialModel: PartialModel = {
    ...deriveEntity(answers, projectModel),
    ...deriveEntityManagementCommon(options, answers),
    ...deriveQueries(answers),
    ...deriveListAttributesFromQuery(answers, projectModel),
    ...deriveEditAttributesFromQuery(answers, projectModel)
  };

  const {listAttributes, editAttributes, entity: entityWithPath} = partialModel;

  type PartialModel2 =
    & PartialModel
    & EntityEditorTemplateModel;

  const partialModel2: PartialModel2 = {
    ...partialModel,
    // ...deriveStringIdAnswers(answers, projectModel, listAttributes, editAttributes), // TODO A different implementation is needed for GraphQL
    ...deriveEditorTemplateModel(answers, projectModel, editAttributes, entityWithPath)
  };

  const {editAssociations} = partialModel2;

  return {
    ...partialModel2,
    ...deriveEditAssociatedEntityClassNames(editAssociations),
    ...templateUtilities
  }
};

function deriveQueries(answers: EntityManagementAnswers): {listQuery: string, editQuery: string} {
  const {listQuery, editQuery} = answers;
  return {
    listQuery,
    editQuery
  };
}

function deriveEditAssociatedEntityClassNames(editAssociations: EditRelations): {editAssociatedEntityClassNames: string[]} {
  const editAssociatedEntityClassNames =
    Array.from(
      new Set(
        Object.values(editAssociations)
          .map(entity => entity.className)
      )
    );
  return {
    editAssociatedEntityClassNames
  };
}