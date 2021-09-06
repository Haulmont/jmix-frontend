import {CommonTemplateModel, deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {MvpTemplateModelStage} from "../../../building-blocks/pipelines/mvpPipeline";
import {MvpComponentOptions} from "../../../building-blocks/stages/options/pieces/mvp";
import {MvpEntityBrowserAnswers} from "./answers";
import {DocumentNode, GraphQLSchema} from "graphql";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import gql from "graphql-tag";
import {getOperationName} from "../../../building-blocks/stages/template-model/pieces/mvp/mvp";
import {GraphQLOutputType} from "graphql/type/definition";

export type MvpEntityBrowserTemplateModel =
  CommonTemplateModel
  & UtilTemplateModel
  & GraphQLBrowserModel
  & {
  queryString: string,
  deleteMutationString?: string,
  idField: string,
  enableEdit: boolean;
};

type GraphQLBrowserModel = {
  /**
   * @deprecated
   */
  entityName: string,
  queryName: string,
  deleteMutationName?: string,
};

export const deriveMvpBrowserTemplateModel: MvpTemplateModelStage<MvpComponentOptions, MvpEntityBrowserAnswers, MvpEntityBrowserTemplateModel> = async (
  options: MvpComponentOptions, answers: MvpEntityBrowserAnswers, schema?: GraphQLSchema, questions?: StudioTemplateProperty[]
): Promise<MvpEntityBrowserTemplateModel> => {
  if (schema == null) {
    throw new Error('Schema is required for this generator');
  }

  const {
    query: queryString,
    mutation: deleteMutationString,
    enableEdit,
    idField = 'id',
  } = answers;

  const queryNode = gql(queryString);
  const mutationNode = deleteMutationString != null ? gql(deleteMutationString) : undefined;

  return {
    ...deriveEntityCommon(options, answers),
    ...templateUtilities,
    ...deriveGraphQLBrowserModel(queryNode, schema, mutationNode),
    queryString,
    deleteMutationString,
    idField,
    enableEdit
  };
};

export function deriveGraphQLBrowserModel(queryNode: DocumentNode, schema: GraphQLSchema, mutationNode?: DocumentNode,): GraphQLBrowserModel {
  const queryName = getOperationName(queryNode);
  const deleteMutationName = mutationNode != null ? getOperationName(mutationNode) : undefined;

  const queryType = schema.getQueryType();
  if (queryType == null) {
    throw new Error('Query type not found');
  }

  const objectType: GraphQLOutputType = queryType.getFields()[queryName].type;
  if (!('ofType' in objectType)) {
    throw new Error('Type name not found');
  }

  const typeName = objectType.ofType.name;

  return {
    queryName,
    deleteMutationName,
    entityName: typeName
  }
}
