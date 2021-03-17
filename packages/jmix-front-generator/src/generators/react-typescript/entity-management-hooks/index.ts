import {ComponentOptions, componentOptionsConfig} from "../../../common/cli-options";
import * as path from "path";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {allQuestions, Answers, getAnswersFromPrompt} from "../entity-management/answers";
import { Options } from "../entity-management/options";
import {TemplateModel, deriveTemplateModel} from "../entity-management/template-model";
import {write} from "../entity-management/write";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";

export class ReactEntityManagementHooksGenerator extends YeomanGenerator {

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


const description = 'CRUD (list + editor) screens for specified entity, editor component is implemented using hooks';

export {
  ReactEntityManagementHooksGenerator as generator,
  componentOptionsConfig as options,
  allQuestions as params,
  description
};
