import {CommonTemplateModel, deriveEntityCommon, ProjectModel, YeomanGenerator} from "@haulmont/jmix-front-generator";
import {Answers} from "./answers";
import {Options} from "./options";

export interface TemplateModel extends CommonTemplateModel {}

export async function deriveTemplateModel(
    answers: Answers, projectModel: ProjectModel, gen: YeomanGenerator, options: Options
  ): Promise<TemplateModel> {
    return {...deriveEntityCommon(options, answers)}
}
