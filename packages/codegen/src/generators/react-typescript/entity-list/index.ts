import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import { amplicodeComponentOptionsConfig } from "../../../building-blocks/stages/options/pieces/amplicode";
import {amplicodePipeline} from "../../../building-blocks/pipelines/amplicodePipeline";
import path from "path";
import { entityListQuestions } from "./answers";
import {deriveEntityListTemplateModel} from "./template-model";
import {writeEntityList} from "./write";

export class EntityListGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline({
      templateDir: path.join(__dirname, 'template'),
      questions: entityListQuestions,
      stages: {
        deriveTemplateModel: deriveEntityListTemplateModel,
        write: writeEntityList
      }
    }, this);
  }
}

const description = 'Set of entities displayed as cards.';
const icon = 'entity-list.svg'
const index = 10;

export {
  EntityListGenerator as generator,
  amplicodeComponentOptionsConfig as options,
  entityListQuestions as params,
  description,
  icon,
  index
}