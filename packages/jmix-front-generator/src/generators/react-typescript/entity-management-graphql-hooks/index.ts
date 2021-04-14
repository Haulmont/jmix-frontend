import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {componentOptionsConfig} from "../../../common/cli-options";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {getAnswersFromPrompt, allQuestions, EntityManagementAnswers } from "./answers";
import * as path from "path";
import {EntityManagementTemplateModel, deriveTemplateModel} from "./template-model";
import {write} from "./write";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

export class ReactEntityManagementGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<ComponentOptions, EntityManagementAnswers, EntityManagementTemplateModel>(
      {
        templateDir: path.join(__dirname, 'template'),
        questions: allQuestions,
        stages: {
          getAnswersFromPrompt,
          deriveTemplateModel,
          write
        }
      },
      this
    );
  }
}

const description = 'CRUD (list + editor) screens for specified entity';

export {
  ReactEntityManagementGenerator as generator,
  componentOptionsConfig as options,
  allQuestions as params,
  description
}