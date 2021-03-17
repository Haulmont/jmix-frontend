import {ProjectModel} from "../../../common/model/cuba-model";
import {CommonTemplateModel} from "../../../building-blocks/stages/template-model/pieces/common";
import {Answers} from "./answers";
import {Options} from "./options";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {elementNameToClass, normalizeRelativePath, unCapitalizeFirst} from "../../../common/utils";

export type TemplateModel = CommonTemplateModel & {
    nameLiteral: string;
}

export async function deriveTemplateModel(
    answers: Answers, projectModel: ProjectModel, gen: YeomanGenerator, options: Options
  ): Promise<TemplateModel> {

    const className = elementNameToClass(answers.componentName);
    const relDirShift = normalizeRelativePath(options.dirShift);
    const nameLiteral = unCapitalizeFirst(className);
    const {componentName} = answers; 

    return {
        className,
        componentName,
        relDirShift,
        nameLiteral,
    }
}
