import {CommonGenerationOptions} from "../../../common/cli-options";
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../YeomanGenerator";

/**
 * Use when you don't need any template model
 *
 * @param answers
 * @param projectModel
 * @param gen
 * @param options
 */
export const defaultDeriveTemplateModel = async  <O extends CommonGenerationOptions, A, M>(
    answers: A, projectModel: ProjectModel, gen?: YeomanGenerator, options?: O
): Promise<M> => {
  return {} as M;
};