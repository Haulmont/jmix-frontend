import {ComponentOptions, CommonGenerationOptions, commonGenerationOptionsConfig} from "../../../common/cli-options";
import path from "path";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {Answers, getAnswersFromPrompt, allQuestions} from "./answers";
import {TemplateModel, deriveTemplateModel} from "./template-model";
import {write} from "./write";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";

export class SdkAllGenerator extends YeomanGenerator {

  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<CommonGenerationOptions, Answers, TemplateModel>({
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
    SdkAllGenerator as generator,
    commonGenerationOptionsConfig as options,
    allQuestions as params,
};
