import {Entity, EntityAttribute, ProjectModel, BeanValidationRule} from "./cuba-model";
import {
  EntityInfo,
  RestQueryInfo,
  RestServiceMethodInfo,
  RestServiceMethodModel,
  ViewInfo
} from "../studio/studio-model";

export function findEntity(projectModel: ProjectModel, entityInfo: EntityInfo | string): Entity | undefined {
  const entityName = typeof entityInfo === 'string'
    ? entityInfo
    : entityInfo.name;

  const allEntities = getAllEntities(projectModel);

  return allEntities.find(e => e.name === entityName);
}

export function findEntityByFqn(projectModel: ProjectModel, fqn: string): Entity | undefined {
  return getAllEntities(projectModel).find(e => e.fqn === fqn);
}

export function getAllEntities(projectModel: ProjectModel): Entity[] {
  const baseEntities: Entity[] = projectModel.baseProjectEntities || [];
  return [...projectModel.entities, ...baseEntities];
}

export function findView(projectModel: ProjectModel, view: ViewInfo) {
  return projectModel.views.find(v => v.name === view.name && v.entity === view.entityName);
}

export function findViewsForEntity(projectModel: ProjectModel, entityName: string): ViewInfo[] {
  return projectModel.views
    .filter(view => view.entity === entityName)
    .map(view => ({ // Convert View (studio project model) to ViewInfo (metadata)
        name: view.name,
        entityName: view.entity
      })
    );
}

export function findQuery(projectModel: ProjectModel, queryInfo: RestQueryInfo) {
  return projectModel.restQueries.find(q => q.entity === queryInfo.entityName && q.name === queryInfo.name);
}

export function findServiceMethod(projectModel: ProjectModel, methodInfo: RestServiceMethodInfo): RestServiceMethodModel | null {
  const service = projectModel.restServices.find(s => s.name === methodInfo.serviceName);
  if (service != null) {
    const method = service.methods.find(m => m.name === methodInfo.methodName);
    if (method != null) {
      return {service, method};
    }
  }
  return null;
}

export function collectAttributesFromHierarchy(entity: Entity, projectModel: ProjectModel): EntityAttribute[] {
  let attrs: EntityAttribute[] = entity.attributes;

  const allEntities: Partial<Entity>[] = ([] as Partial<Entity>[])
    .concat(projectModel.entities)
    .concat(projectModel.baseProjectEntities ? projectModel.baseProjectEntities : []);

  let {parentClassName, parentPackage} = entity;

  let parentFqn = composeParentFqn(parentPackage, parentClassName);

  while (parentFqn.length > 0) {
    const parent = allEntities.find(e => e.fqn === parentFqn);
    if (parent) {
      attrs = parent.attributes ? attrs.concat(parent.attributes) : attrs;
      parentPackage = parent.parentPackage ? parent.parentPackage : '';
      parentClassName = parent.parentClassName ? parent.parentClassName : '';
    } else {
      parentPackage = '';
      parentClassName = '';
    }
    parentFqn = composeParentFqn(parentPackage, parentClassName);
  }

  return attrs;
}

// Quick check; does not ensure entity is among non-base project entities
export function isBaseProjectEntity(entity: Entity, projectModel: ProjectModel) {

  if (!projectModel.baseProjectEntities) return false;

  const baseProjectEntities = projectModel.baseProjectEntities;

  if (baseProjectEntities.find(bpe => bpe.name === entity.name)){
    return true;
  }
  return false
}

export function composeParentFqn(parentPackage: string | undefined, parentClassName: string | undefined): string {
  if (!parentClassName || !parentPackage) return '';
  if (parentPackage.length == 0 || parentClassName.length == 0) return '';
  return `${parentPackage}.${parentClassName}`;
}

export function transformValidationRules(rules?: BeanValidationRule[]) {
  if (rules == null) {
    return rules
  }

  return rules.map(rule => {
    if (rule.name === 'Pattern' || rule.name === 'Email') {
      return {
        ...rule,
        ...transformRegex(rule.regexp)
      }
    }

    return rule;
  });
}

const CASE_INSENSITIVE_MOD = '(?i)'

function transformRegex(pattern?: string) {
  if (pattern == null) {
    return {};
  }
  const modifiers = new Set()

  //search for case-insensive
  const hasCaseInsensitive = pattern.includes(CASE_INSENSITIVE_MOD)

  if (hasCaseInsensitive) {
    pattern = pattern.replace(CASE_INSENSITIVE_MOD, '')
    modifiers.add('i')
  }

  return {
    regexp: pattern,
    modifiers: Array.from(modifiers.values()).join('')
  };
}
