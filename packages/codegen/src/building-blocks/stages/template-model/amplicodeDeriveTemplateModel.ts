import {GraphQLSchema} from "graphql";
import { AmplicodeCommonOptions } from "../options/pieces/amplicode";

export const amplicodeDeriveTemplateModel = async <O extends AmplicodeCommonOptions, A, T>(
  options: O,
  answers: A,
  _schema?: GraphQLSchema,
  _schemaPath?: string
): Promise<T> => {
  return answers as unknown as T;
}
