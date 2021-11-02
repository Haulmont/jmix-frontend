import {EntityAttribute} from "../../common/model/cuba-model";

export function isStringAttribute(attr: EntityAttribute) {
  return attr.mappingType === 'DATATYPE' && attr.type.label === 'String';
}
