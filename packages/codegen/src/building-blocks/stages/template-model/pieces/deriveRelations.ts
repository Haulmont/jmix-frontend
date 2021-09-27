import { getRelations, RelationalAttributes } from "./relations";
import { EntityAttribute, ProjectModel } from "../../../../common/model/cuba-model";

export interface RelationsTemplateModel {
  relations: RelationalAttributes;
}
  
export function deriveRelations(projectModel: ProjectModel, attributes: EntityAttribute[]): RelationsTemplateModel {
  const {associations, compositions} = getRelations(projectModel, attributes);
  const relations = {
    ...associations,
    ...compositions,
  };
  return {relations};
}
  