import {ComponentOptions, componentOptionsConfig} from "../../../common/cli-options";
import path from "path";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {allQuestions, Answers, getAnswersFromPrompt} from "./answers";
import { Options } from "./options";
import {TemplateModel, deriveTemplateModel} from "./template-model";
import {write} from "./write";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";

export class EntityCardsGenerator extends YeomanGenerator {

  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<Options, Answers, TemplateModel>({
      templateDir: path.join(__dirname, 'template'),
      questions: allQuestions, // Used when refining answers
      stages: { // Using custom implementations for some of the stages
        getAnswersFromPrompt,
        deriveTemplateModel,
        write
      }
    }, this);
  }
}

const description = 'Read-only list of entities displayed as cards grid by 2, 3 or 4 columns in a row';

export {
  EntityCardsGenerator as generator,
  componentOptionsConfig as options,
  allQuestions as params,
  description
}
