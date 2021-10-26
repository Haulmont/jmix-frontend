import {AppAnswers} from "./answers";
import { AmplicodeCommonOptions } from "../../../building-blocks/stages/options/pieces/amplicode";

export type AppTemplateModel = AppAnswers & {schemaPath: string};

export const deriveTemplateModel = async <O extends AmplicodeCommonOptions, A, T>(
  options: O,
  answers: A,
): Promise<T> => {
  const {schema} = options;
  return {... answers as unknown as T, schemaPath: schema};
}
