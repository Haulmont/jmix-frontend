import {MvpEntityEditorTemplateModel, deriveEntityDetailsTemplateModel} from "../entity-details/template-model";
import {EntityManagementAnswers} from "./answers";
import {getOperationName} from "../../../building-blocks/stages/template-model/pieces/amplicode/amplicode";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
import {GraphQLSchema} from "graphql";
import gql from "graphql-tag";
import {
  BaseTemplateModel,
  baseTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/BaseTemplateModel";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {
  deriveScreenTemplateModel,
  ScreenTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/ScreenTemplateModel";

export interface EntityManagementTemplateModel extends BaseTemplateModel, UtilTemplateModel, ScreenTemplateModel
{
  listComponentName: string,
  detailsComponentName: string,
  queryString: string,
  queryName: string,
  deleteMutationString?: string,
  deleteMutationName?: string,
  mode: string,
  idField: string,
  shouldAddToMenu: boolean,
  entityDetailsTemplateModel: MvpEntityEditorTemplateModel
}

export const deriveManagementTemplateModel = async (
  options: AmplicodeComponentOptions,
  answers: EntityManagementAnswers,
  schema?: GraphQLSchema
): Promise<EntityManagementTemplateModel> => {

  const {
    listComponentName,
    detailsComponentName,
    listQuery,
    detailsQuery,
    upsertMutation,
    deleteMutation,
    shouldAddToMenu,
    mode = 'edit',
    idField = 'id',
  } = answers;

  const queryNode = gql(listQuery);
  const mutationNode = deleteMutation != null ? gql(deleteMutation) : undefined;
  const queryName = getOperationName(queryNode);
  const deleteMutationName = mutationNode != null ? getOperationName(mutationNode) : undefined;

  const entityDetailsTemplateModel = await deriveEntityDetailsTemplateModel(
    options, {
      componentName: detailsComponentName,
      query: detailsQuery,
      mutation: upsertMutation,
      shouldAddToMenu: false,
      listQueryName: queryName,
    },
    schema
  )

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, {componentName: listComponentName, shouldAddToMenu}),
    listComponentName,
    detailsComponentName,
    queryString: listQuery,
    queryName,
    deleteMutationString: deleteMutation,
    deleteMutationName,
    mode,
    idField,
    shouldAddToMenu,
    entityDetailsTemplateModel
  }
};
