import {GraphQLSchema} from "graphql";
import {YeomanGenerator} from "../../YeomanGenerator";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import { MvpCommonOptions } from "../options/pieces/mvp";

export const mvpDeriveTemplateModel = async <O extends MvpCommonOptions, A, T>(
  options: O,
  answers: A,
  schema: GraphQLSchema,
  gen: YeomanGenerator,
  questions?: StudioTemplateProperty[]
): Promise<T> => {
  return {} as T;
}