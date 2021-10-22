import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {AmplicodeTemplateModelStage} from "../../../building-blocks/pipelines/amplicodePipeline";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
import {EntityListMode, EntityListAnswers} from "./answers";
import {GraphQLSchema} from "graphql";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import gql from "graphql-tag";
import {getOperationName} from "../../../building-blocks/stages/template-model/pieces/amplicode/amplicode";
import {
  baseTemplateModel,
  BaseTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/BaseTemplateModel";
import {
  deriveScreenTemplateModel,
  ScreenTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/ScreenTemplateModel";

export interface EntityListTemplateModel extends
  BaseTemplateModel, UtilTemplateModel, ScreenTemplateModel {
  queryName: string,
  queryString: string,
  deleteMutationName?: string,
  deleteMutationString?: string,
  idField: string,
  mode: EntityListMode;
}

export const deriveEntityListTemplateModel: AmplicodeTemplateModelStage<AmplicodeComponentOptions, EntityListAnswers, EntityListTemplateModel> = async (
  options: AmplicodeComponentOptions, answers: EntityListAnswers, _schema?: GraphQLSchema, _questions?: StudioTemplateProperty[]
): Promise<EntityListTemplateModel> => {
  const {
    componentName,
    query: queryString,
    mutation: deleteMutationString,
    mode = 'edit',
    idField = 'id',
  } = answers;

  const queryNode = gql(queryString);
  const mutationNode = deleteMutationString != null ? gql(deleteMutationString) : undefined;
  const queryName = getOperationName(queryNode);
  const deleteMutationName = mutationNode != null ? getOperationName(mutationNode) : undefined;

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, answers),
    componentName,
    queryName,
    queryString,
    deleteMutationName,
    deleteMutationString,
    idField,
    mode
  };
};

