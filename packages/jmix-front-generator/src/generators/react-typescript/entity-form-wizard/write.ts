import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {Options} from "./options";
import {TemplateModel} from "./template-model";
import {addMenuItem} from "../../../building-blocks/stages/writing/pieces/menu";
import { YeomanGenerator } from "src/building-blocks/YeomanGenerator";

export function writeFormStepsComponent<M extends {className: string}>(
  gen: YeomanGenerator,
  extension: string,
  model: M
) {
  gen.fs.copyTpl(
    gen.templatePath('FormSteps' + extension),
    gen.destinationPath(model.className + extension), model
  );
}


export const write: WriteStage<Options, TemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  const {dirShift} = options;
  const {className, nameLiteral} = templateModel;

  const extension = '.tsx.ejs';

  writeFormStepsComponent(gen, extension, templateModel);
  addMenuItem(gen, dirShift, className, nameLiteral);
};
