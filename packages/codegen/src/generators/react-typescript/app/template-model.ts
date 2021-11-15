import {AppAnswers} from "./answers";
import { AmplicodeCommonOptions } from "../../../building-blocks/stages/options/pieces/amplicode";
import {GraphQLSchema} from "graphql";

export type AppTemplateModel = AppAnswers & {schemaPath: string};

export const deriveTemplateModel = async <O extends AmplicodeCommonOptions, A, T>(
  options: O,
  answers: A,
  _schema?: GraphQLSchema,
  schemaPath?: string
): Promise<T> => {
  return {... answers as unknown as T, schemaPath};
}
