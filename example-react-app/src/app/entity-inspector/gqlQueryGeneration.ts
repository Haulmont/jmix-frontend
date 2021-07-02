import { 
  getAllEntityPropertiesNames, 
  getPropertyInfo, 
  isAssociation, 
  isComposition, 
  isRelationProperty, 
  Metadata, 
  MetaPropertyInfo ,
  EntityNamesInfo,
  unCapitalizeFirst
} from "@haulmont/jmix-react-core";

export enum GqlQueryType {
  DataList = 'dataList',
  DataById = 'dataById',
  Upsert = 'upsert'
}

export function generateGqlQuery(
  {entityName, className}: EntityNamesInfo, 
  metadata: Metadata, 
  entityAttrs: string[], 
  queryType: GqlQueryType
) {
  let query = ``;
  switch(queryType) {
    case GqlQueryType.DataList:
      query = `
        query ${entityName}List(
          $limit: Int, 
          $offset: Int, 
          $orderBy: inp_${entityName}OrderBy, 
          $filter: [inp_${entityName}FilterCondition]
        ) {
          ${entityName}Count(filter: $filter)
          ${entityName}List(
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            filter: $filter
          ) {
        `; break;

    case GqlQueryType.DataById: 
      query = `
        query ${entityName}ById($id: String = "", $loadItem: Boolean!) {
          ${entityName}ById(id: $id) @include(if: $loadItem) {
        `; break;

    case GqlQueryType.Upsert:
      query = `
        mutation Upsert_${entityName}($${unCapitalizeFirst(className)}: inp_${entityName}!) {
          upsert_${entityName}(${unCapitalizeFirst(className)}: $${unCapitalizeFirst(className)}) {
            id
          }
        }
      `;
      return query;
  }

  query += ` _instanceName `;
  
  const queriedAttrs = entityAttrs.map((attr) => {
    return getAttrForQglQuery(metadata, entityName, attr);
  }).join(" ");

  const reletionsLists = entityAttrs.map((attr) => {
    return getReletionsGqlQueryLists(metadata, entityName, attr);
  }).join(" ");

  query += ` ${queriedAttrs} } ${reletionsLists} } `;
  return query;
}

function getAttrForQglQuery(metadata: Metadata, entityName: string, attrName: string): string {
  const propInfo = getPropertyInfo(metadata.entities, entityName, attrName) ?? {} as MetaPropertyInfo ;

  if (isAssociation(propInfo)) {
    return ` 
    ${attrName} {
      id
      _instanceName
    }
     `;
  }

  if (isComposition(propInfo)) {
    let queriedAttr = ` 
      ${attrName} {
        _instanceName
    `;
    const compAttrs =  getAllEntityPropertiesNames(propInfo.type, metadata);
    if(!compAttrs?.find((attr) => attr === "id")) {
      queriedAttr += ` id `;

    }
    compAttrs?.forEach((attr) => {
      queriedAttr += getAttrForQglQuery(metadata, propInfo.type, attr);
    });
    queriedAttr += ` }`;
    return queriedAttr;
  }

  return ` ${attrName} `;
}

function getReletionsGqlQueryLists(metadata: Metadata, entityName: string, attrName: string): string {
  const propInfo = getPropertyInfo(metadata.entities, entityName, attrName) ?? {} as MetaPropertyInfo ;

  return isRelationProperty(propInfo)
   ? `
    ${propInfo.type}List {
      id
      _instanceName
    } `
  : ``
}
