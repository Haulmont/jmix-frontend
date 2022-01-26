import { 
  getPropertyInfo, 
  isAssociation, 
  isComposition, 
  isRelationProperty, 
  Metadata, 
  MetaPropertyInfo,
  unCapitalizeFirst,
  findEntityMetadata
} from "@haulmont/jmix-react-core";
import {getAllEntityPropertyNames} from "./EntityInspector.helpers";


/**
 * This function returns string with mutation query for using it gql function 
 * @example
 *  mutation Upsert_scr_Car($car: inp_scr_Car!) {
 *    upsert_scr_Car(car: $car) {
 *       id
 *    }
 *  }
 */
export function generateGqlMutationUpsert(entityName: string, className: string) {
  return `
    mutation Upsert_${entityName}($${unCapitalizeFirst(className)}: inp_${entityName}!) {
      upsert_${entityName}(${unCapitalizeFirst(className)}: $${unCapitalizeFirst(className)}) {
        id
      }
    }`;
}

/**
 * This function returns string with data by id query for using it gql function 
 * @example
 *  query scr_CarById($id: String = "", $loadItem: Boolean!) {
 *    scr_CarById(id: $id) @include(if: $loadItem) {
 *      _instanceName
 *      id
 *      manufacturer
 *      model
 *      regNumber
 *      purchaseDate
 *      manufactureDate
 *      wheelOnRight
 *      carType
 *      ecoRank
 *      garage {
 *        id
 *        _instanceName
 *      }
 *      maxPassengers
 *      price
 *      mileage
 *      technicalCertificate {
 *        id
 *        _instanceName
 *      }
 *      version
 *      createdBy
 *      createdDate
 *      lastModifiedBy
 *      lastModifiedDate
 *      photo
 *    }
 *    scr_GarageList {
 *      id
 *      _instanceName
 *    }
 *    scr_TechnicalCertificateList {
 *      id
 *      _instanceName
 *    }
 *  }
 */
export function generateGqlQueryDataById(
  entityName: string, 
  metadata: Metadata, 
  entityAttrs: string[]
) {
  let query = `
    query ${entityName}ById($id: String = "", $loadItem: Boolean!) {
      ${entityName}ById(id: $id, softDeletion: false) @include(if: $loadItem) {
        _instanceName 
  `;
  const {queriedAttrs, reletionsList} = getAttrsAndReletaionsForGql(entityName, entityAttrs, metadata);

  query += ` ${queriedAttrs} } ${reletionsList} } `;
  return query;

}


/**
 * This function returns string with list and count query for using it gql function 
 * @example
 *  query scr_CarList($limit: Int, $offset: Int, $orderBy: [inp_scr_CarOrderBy], $filter: [inp_scr_CarFilterCondition]) {
 *    scr_CarCount(filter: $filter, softDeletion: false)
 *    scr_CarList(limit: $limit, offset: $offset, orderBy: $orderBy, filter: $filter, softDeletion: false) {
 *      _instanceName
 *      id
 *      manufacturer
 *      model
 *      regNumber
 *      purchaseDate
 *      manufactureDate
 *      wheelOnRight
 *      carType
 *      ecoRank
 *      garage {
 *        id
 *        _instanceName
 *      }
 *      maxPassengers
 *      price
 *      mileage
 *      technicalCertificate {
 *        id
 *        _instanceName
 *      }
 *      version
 *      createdBy
 *      createdDate
 *      lastModifiedBy
 *      lastModifiedDate
 *      photo
 *    }
 *    scr_GarageList {
 *      id
 *      _instanceName
 *    }
 *    scr_TechnicalCertificateList {
 *      id
 *      _instanceName
 *    }
 *  }
 */
export function generateGqlQueryDataList(
  entityName: string,
  metadata: Metadata, 
  entityAttrs: string[]
) {
  let query = `
    query ${entityName}List(
      $limit: Int, 
      $offset: Int, 
      $orderBy: [inp_${entityName}OrderBy], 
      $filter: [inp_${entityName}FilterCondition]
    ) {
      ${entityName}Count(
        filter: $filter 
        softDeletion: false
      )
      ${entityName}List(
        limit: $limit
        offset: $offset
        orderBy: $orderBy
        filter: $filter
        softDeletion: false
      ) {
        _instanceName
    `;

  const {queriedAttrs, reletionsList} = getAttrsAndReletaionsForGql(entityName, entityAttrs, metadata);

  query += ` ${queriedAttrs} } ${reletionsList} } `;
  return query;
}

function getAttrsAndReletaionsForGql(
  entityName: string,
  entityAttrs: string[],
  metadata: Metadata, 
): {queriedAttrs: string, reletionsList: string }{

  const queriedAttrs = entityAttrs.map((attr) => {
    return getAttrsForQglQuery(metadata, entityName, attr);
  }).join(" ");

  const reletionsList = entityAttrs.map((attr) => {
    return getReletionsGqlQueryList(metadata, entityName, attr);
  }).join(" ");

  return {
    queriedAttrs,
    reletionsList
  }
}

function getAttrsForQglQuery(metadata: Metadata, entityName: string, attrName: string): string {
  const propInfo = getPropertyInfo(metadata.entities, entityName, attrName) ?? {} as MetaPropertyInfo ;

  if (isAssociation(propInfo)) {
    return ` 
    ${attrName} {
      ${findEntityMetadata(propInfo.type, metadata)?.idAttributeName}
      _instanceName
    }
     `;
  }

  if (isComposition(propInfo)) {
    let queriedAttr = ` 
      ${attrName} {
        _instanceName
    `;
    const compAttrs =  getAllEntityPropertyNames(propInfo.type, metadata);

    compAttrs?.forEach((attr) => {
      queriedAttr += getAttrsForQglQuery(metadata, propInfo.type, attr);
    });
    queriedAttr += ` }`;
    return queriedAttr;
  }

  return ` ${attrName} `;
}

function getReletionsGqlQueryList(metadata: Metadata, entityName: string, attrName: string): string {
  const propInfo = getPropertyInfo(metadata.entities, entityName, attrName) ?? {} as MetaPropertyInfo ;

  return isRelationProperty(propInfo)
   ? `
    ${propInfo.type}List {
      ${findEntityMetadata(propInfo.type, metadata)?.idAttributeName}
      _instanceName
    } `
  : ``
}
