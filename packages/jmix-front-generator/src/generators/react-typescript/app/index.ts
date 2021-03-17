import {ComponentOptions, commonGenerationOptionsConfig} from "../../../common/cli-options";
import * as path from "path";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {Answers, getAnswersFromPrompt, allQuestions} from "./answers";
import {Options} from "./options";
import {TemplateModel, deriveTemplateModel} from "./template-model";
import {write} from "./write";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";

export class ReactTSAppGenerator extends YeomanGenerator {

  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<Options, Answers, TemplateModel>({
      templateDir: path.join(__dirname, 'template'),
      questions: allQuestions,
      stages: {
        getAnswersFromPrompt,
        deriveTemplateModel,
        write
      }
    }, this);
  }
}

export {
  ReactTSAppGenerator as generator,
  commonGenerationOptionsConfig as options,
  allQuestions as params,
};
