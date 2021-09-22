import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {MvpTemplateModelStage} from "../../../building-blocks/pipelines/mvpPipeline";
import {MvpComponentOptions} from "../../../building-blocks/stages/options/pieces/mvp";
import {EntityListMode, MvpEntityBrowserAnswers} from "./answers";
import {GraphQLSchema} from "graphql";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import gql from "graphql-tag";
import {getOperationName} from "../../../building-blocks/stages/template-model/pieces/mvp/mvp";
import {
  baseTemplateModel,
  BaseTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/mvp/BaseTemplateModel";
import {
  deriveScreenTemplateModel,
  ScreenTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/mvp/ScreenTemplateModel";

export type MvpEntityListTemplateModel =
  BaseTemplateModel
  & UtilTemplateModel
  & ScreenTemplateModel
  & {
  queryName: string,
  queryString: string,
  deleteMutationName?: string,
  deleteMutationString?: string,
  idField: string,
  mode: EntityListMode;
};

export const deriveMvpBrowserTemplateModel: MvpTemplateModelStage<MvpComponentOptions, MvpEntityBrowserAnswers, MvpEntityListTemplateModel> = async (
  options: MvpComponentOptions, answers: MvpEntityBrowserAnswers, schema?: GraphQLSchema, questions?: StudioTemplateProperty[]
): Promise<MvpEntityListTemplateModel> => {
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

