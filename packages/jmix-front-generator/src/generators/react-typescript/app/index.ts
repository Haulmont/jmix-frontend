import path from "path";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {Answers, getAnswersFromPrompt, allQuestions} from "./answers";
import {Options, appOptionsConfig} from "./options";
import {TemplateModel, deriveTemplateModel} from "./template-model";
import {write} from "./write";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

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

const index = 1;

export {
  ReactTSAppGenerator as generator,
  appOptionsConfig as options,
  allQuestions as params,
  index,
};
