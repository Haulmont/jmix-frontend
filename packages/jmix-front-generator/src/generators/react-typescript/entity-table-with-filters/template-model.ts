import {EntityAttribute, ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {
  deriveEntityCommon,
  CommonTemplateModel,
} from "../../../building-blocks/stages/template-model/pieces/common";
import {
  deriveEntity,
  EntityWithPath,
} from "../../../building-blocks/stages/template-model/pieces/entity";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {TableWithFiltersAnswers} from "./answers";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import { ScreenType } from "../../../building-blocks/stages/template-model/pieces/entity";
import { getDisplayedAttributesFromQuery } from "../../../building-blocks/stages/template-model/pieces/getDisplayedAttributesFromQuery";
import { deriveRelations, RelationsTemplateModel } from "../../../building-blocks/stages/template-model/pieces/deriveRelations";

export interface TableWithFiltersTemplateModel extends
CommonTemplateModel,
UtilTemplateModel,
RelationsTemplateModel {
  filterableFields: string[];
  query: string;
  attributes: EntityAttribute[];
  entity: EntityWithPath;
  stringIdName?: string;
};

export const deriveTableWithFiltersTemplateModel = async (
  answers: TableWithFiltersAnswers, projectModel: ProjectModel, gen: YeomanGenerator, options: ComponentOptions
): Promise<TableWithFiltersTemplateModel> => {
  const attributes = getDisplayedAttributesFromQuery({
    entity: answers.entity,
    query: answers.query,
    screenType: ScreenType.BROWSER,
  }, projectModel);

  return {
    query: answers.query,
    attributes,
    filterableFields: answers.filterableFields,
    ...deriveEntity(answers, projectModel),
    ...deriveEntityCommon(options, answers),
    ...deriveRelations(projectModel, attributes),
    // ...deriveStringIdAnswers(answers, projectModel, listAttributes, editAttributes), // TODO A different implementation is needed for GraphQL
    ...templateUtilities
  }
};
