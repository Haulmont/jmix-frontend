import {ProjectModel} from "../../../common/model/cuba-model";
import {Answers} from "./answers";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {throwError} from '../../../common/utils';
import { CommonGenerationOptions } from "../../../common/cli-options";

export type TemplateModel = ProjectModel;

export const deriveTemplateModel = async (
  answers: Answers, projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<TemplateModel> => {
    if (projectModel != null) {
        return projectModel;
    } 
    throwError(gen, 'Skip sdk generation - no project model provided');
}
