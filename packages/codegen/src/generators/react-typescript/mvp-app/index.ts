import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {mvpPipeline} from "../../../building-blocks/pipelines/mvpPipeline";
import path from "path";
import {MvpCommonOptions, mvpCommonOptionsConfig} from "../../../building-blocks/stages/options/pieces/mvp";
import {MvpAppAnswers, mvpAppQuestions } from "./answers";
import {MvpAppTemplateModel} from "./template-model";

export class MvpAppGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await mvpPipeline<MvpCommonOptions, MvpAppAnswers, MvpAppTemplateModel>({
      templateDir: path.join(__dirname, 'template'),
      questions: mvpAppQuestions
    }, this);
  }
}

export {
  MvpAppGenerator as generator,
  mvpCommonOptionsConfig as options,
  mvpAppQuestions as params,
}
