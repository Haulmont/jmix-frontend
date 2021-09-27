import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {amplicodePipeline} from "../../../building-blocks/pipelines/amplicodePipeline";
import path from "path";
import { entityDetailsQuestions } from "./answers";
import { deriveEntityDetailsTemplateModel } from "./template-model";
import { amplicodeComponentOptionsConfig } from "../../../building-blocks/stages/options/pieces/amplicode";
import {writeEntityDetails} from "./write";

export class MvpEntityEditor extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline({
      templateDir: path.join(__dirname, 'template'),
      questions: entityDetailsQuestions,
      stages: {
        deriveTemplateModel: deriveEntityDetailsTemplateModel,
        write: writeEntityDetails
      }
    }, this);
  }
}

const description = 'Standard entity editor screen with a form and action buttons.';
const icon = 'entity-details.svg'
const index = 20;

export {
  MvpEntityEditor as generator,
  amplicodeComponentOptionsConfig as options,
  entityDetailsQuestions as params,
  description,
  icon,
  index
};
