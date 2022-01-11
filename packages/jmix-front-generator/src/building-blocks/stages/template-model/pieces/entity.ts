import {Entity, ProjectModel, EntityAttribute, ViewProperty} from "../../../../common/model/cuba-model";
import {collectAttributesFromHierarchy, composeParentFqn, findEntityByFqn} from "../../../../common/model/cuba-model-utils";
import {getEntityPath} from "../../../../generators/react-typescript/common/template-model";

export interface EntityWithPath extends Entity {
  path: string; // path relative to SDK placement
}

export interface EntityTemplateModel {
  entity: EntityWithPath;
}

export interface EntityAnswers {
  entity: Entity;
}

export function deriveEntity(
  answers: EntityAnswers, projectModel: ProjectModel
): EntityTemplateModel {
  const entity = answers.entity;

  const entityWithPath = {
    entity: {
      ...entity,
      path: getEntityPath(entity, projectModel)
    }
  };

  return entityWithPath;
}

export enum ScreenType {
  BROWSER = 'browser',
  EDITOR = 'editor'
}

export function createEntityTemplateModel(entity: Entity, projectModel: ProjectModel) {
  return {
    ...entity,
    path: getEntityPath(entity, projectModel)
  };
}

/**
 *
 * @param projectModel
 * @param entity
 * @returns `true` if a given entity is a descendant of `BaseStringIdEntity`
 */
export function isStringIdEntity(projectModel: ProjectModel, entity: Entity): boolean {

  if (entity.fqn === 'com.haulmont.cuba.core.entity.BaseStringIdEntity') {
    return true;
  }

  if (entity.parentPackage == null || entity.parentClassName == null) {
    return false;
  }

  const parentFqn = composeParentFqn(entity.parentPackage, entity.parentClassName);
  const parentEntity = findEntityByFqn(projectModel, parentFqn);

  if (parentEntity == null) {
    return false;
  }

  return isStringIdEntity(projectModel, parentEntity);
}

export function getDisplayedAttributes(
  viewProperties: ViewProperty[], entity: EntityWithPath, projectModel: ProjectModel, screenType: ScreenType
): EntityAttribute[] {
  return viewProperties.reduce((attrArr: EntityAttribute[], prop) => {
    const attr = collectAttributesFromHierarchy(entity, projectModel).find(ea => ea.name === prop.name);
    if (attr && isDisplayedAttribute(attr, screenType, entity)) {
      attrArr.push(attr);
    }
    return attrArr;
  }, []);
}

function isDisplayedAttribute(attr: EntityAttribute, screenType: ScreenType, entity: EntityWithPath) {
  // Do not display one to many associations in editor
  if (attr.mappingType === 'ASSOCIATION' && attr.cardinality === 'ONE_TO_MANY' && screenType === ScreenType.EDITOR) {
    return false;
  }

  // Do not display byte arrays
  if (attr.mappingType === 'DATATYPE' && attr.type?.fqn === 'byte[]') {
    return false;
  }

  // Do not display trait attributes
  if (attr.traitAttribute !== undefined) {
    return false;
  }

  // Do not display id attribute unless it is a String ID entity
  // TODO currently doesn't check for String ID entity
  // noinspection RedundantIfStatementJS
  if (attr.name === entity.idAttributeName) {
    return false;
  }

  return true;
}
