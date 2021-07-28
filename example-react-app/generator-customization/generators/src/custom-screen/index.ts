import {ComponentOptions, componentOptionsConfig, defaultPipeline, YeomanGenerator} from "@haulmont/jmix-front-generator";
import {allQuestions, Answers, getAnswersFromPrompt} from "./answers";
import { Options } from "./options";
import {deriveTemplateModel, TemplateModel} from "./template-model";
import * as path from "path";
import {write} from "./write";

export class ReactComponentGenerator extends YeomanGenerator {

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

const description = 'Empty screen template.';
const icon = "blank.svg"
const index = 0;
export {
  ReactComponentGenerator as generator,
  componentOptionsConfig as options,
  allQuestions as params,
  description,
  icon,
  index
};
