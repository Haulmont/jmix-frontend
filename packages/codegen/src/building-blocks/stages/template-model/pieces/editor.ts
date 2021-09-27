import {EntityAttribute, ProjectModel} from "../../../../common/model/cuba-model";
import {EntityWithPath} from "./entity";
import {getRelationImports, getRelations, RelationalAttributes, RelationImport} from "./relations";

export type EntityEditorTemplateModel = {
  readOnlyFields: string[];
  compositions: RelationalAttributes;
  associations: RelationalAttributes;
  nestedEntityInfo?: Record<string, string>;
  relationImports: RelationImport[];
  associatedEntityClassNames: string[];
};

export type EntityEditorAnswers = {
  entity: EntityWithPath;
  nestedEntityInfo?: Record<string, string>;
};

/**
 * Derives template model that is common for editors (does not include edit attributes as there are multiple ways
 * of obtaining them depending on whether we use REST or GraphQL).
 *
 * @param answers
 * @param projectModel
 * @param editAttributes
 * @param entityWithPath
 */
export function deriveEditorTemplateModel(
  answers: EntityEditorAnswers, projectModel: ProjectModel, editAttributes: EntityAttribute[]
): EntityEditorTemplateModel {
  const readOnlyFields = editAttributes
    .filter((attr: EntityAttribute) => attr.readOnly)
    .map((attr: EntityAttribute) => attr.name);

  const { associations, compositions } = getRelations(projectModel, editAttributes);

  const nestedEntityInfo = answers.nestedEntityInfo;

  const relationImports = getRelationImports(associations, answers.entity);

  const associatedEntityClassNames =
    Array.from(
      new Set(
        Object.values(associations)
          .map(entity => entity.className)
      )
    );

  return {
    readOnlyFields,
    associations,
    compositions,
    nestedEntityInfo,
    relationImports,
    associatedEntityClassNames,
  };
}