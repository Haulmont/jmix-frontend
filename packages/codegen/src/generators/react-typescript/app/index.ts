import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {amplicodePipeline} from "../../../building-blocks/pipelines/amplicodePipeline";
import path from "path";
import {AmplicodeCommonOptions, amplicodeCommonOptionsConfig} from "../../../building-blocks/stages/options/pieces/amplicode";
import {AppAnswers, appQuestions } from "./answers";
import {AppTemplateModel} from "./template-model";

export class AppGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline<AmplicodeCommonOptions, AppAnswers, AppTemplateModel>({
      templateDir: path.join(__dirname, 'template'),
      questions: appQuestions
    }, this);
  }
}

export {
  AppGenerator as generator,
  amplicodeCommonOptionsConfig as options,
  appQuestions as params,
}
