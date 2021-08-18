import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {componentOptionsConfig} from "../../../common/cli-options";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {getAnswersFromPrompt, commonEntityManagementQuestions, EntityManagementAnswers } from "./answers";
import path from "path";
import {EntityManagementTemplateModel, deriveManagementTemplateModel} from "./template-model";
import {writeManagement} from "./write";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

export class ReactEntityManagementGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<ComponentOptions, EntityManagementAnswers, EntityManagementTemplateModel>(
      {
        templateDir: path.join(__dirname, 'template'),
        questions: commonEntityManagementQuestions,
        stages: {
          getAnswersFromPrompt,
          deriveTemplateModel: deriveManagementTemplateModel,
          write: writeManagement,
        }
      },
      this
    );
  }
}

const description = 'Standard entity editor and browser screens created at once. The best choice for CRUD operations.';
const icon = 'entity-management.svg';
const index = 5;

export {
  ReactEntityManagementGenerator as generator,
  componentOptionsConfig as options,
  commonEntityManagementQuestions as params,
  description,
  icon,
  index
}