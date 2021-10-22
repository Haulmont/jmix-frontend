import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {amplicodePipeline} from "../../../building-blocks/pipelines/amplicodePipeline";
import { amplicodeComponentOptionsConfig } from "../../../building-blocks/stages/options/pieces/amplicode";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import path from "path";
import {commonEntityManagementQuestions} from "./answers";
import {deriveManagementTemplateModel} from "./template-model";
import {writeManagement} from "./write";

export class ReactEntityManagementGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline({
        templateDir: path.join(__dirname, 'template'),
        questions: commonEntityManagementQuestions,
        stages: {
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
  amplicodeComponentOptionsConfig as options,
  commonEntityManagementQuestions as params,
  description,
  icon,
  index
}