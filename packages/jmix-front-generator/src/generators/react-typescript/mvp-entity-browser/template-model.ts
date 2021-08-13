import {CommonTemplateModel, deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {MvpTemplateModelStage} from "../../../building-blocks/pipelines/mvpPipeline";
import {MvpCommonOptions, MvpComponentOptions} from "../../../building-blocks/stages/options/pieces/mvp";
import {MvpEntityBrowserAnswers} from "./answers";
import {GraphQLSchema} from "graphql";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import gql from "graphql-tag";
import {getOperationName} from "../../../building-blocks/stages/template-model/pieces/mvp/mvp";

export type MvpEntityBrowserTemplateModel =
  CommonTemplateModel
  & UtilTemplateModel
  & {
  entityName: string,
  queryName: string,
  queryString: string,
  deleteMutationName: string,
  deleteMutationString: string,
};

export const deriveMvpBrowserTemplateModel: MvpTemplateModelStage<MvpComponentOptions, MvpEntityBrowserAnswers, MvpEntityBrowserTemplateModel> = async (
  options: MvpComponentOptions, answers: MvpEntityBrowserAnswers, schema: GraphQLSchema, gen: YeomanGenerator, questions?: StudioTemplateProperty[]
): Promise<MvpEntityBrowserTemplateModel> => {
  const queryString = answers.query;
  const deleteMutationString = answers.mutation;

  const queryNode = gql(queryString);
  const mutationNode = gql(deleteMutationString);

  const queryName = getOperationName(queryNode);
  const deleteMutationName = getOperationName(mutationNode);

  return {
    ...deriveEntityCommon(options, answers),
    ...templateUtilities,
    entityName: 'scr_Car', // TODO
    queryName,
    deleteMutationName,
    queryString,
    deleteMutationString
  };
};
