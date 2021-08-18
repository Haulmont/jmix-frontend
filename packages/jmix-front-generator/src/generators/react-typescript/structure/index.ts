import {componentOptionsConfig} from "../../../common/cli-options";
import path from "path";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {StructureQuestions, StructureAnswers} from "./answers";
import {Options} from "./options";
import {TemplateModel, deriveTemplateModel} from "./template-model";
import {write} from "./write";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

export class ReactComponentGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<Options, StructureAnswers, TemplateModel>({
      templateDir: path.join(__dirname, 'template'),
      questions: StructureQuestions,
      stages: {
        deriveTemplateModel,
        write
      }
    }, this);
  }
}

const description = 'Layout with several columns. Proportions and amount of columns are configurable upon creation.';
const icon = 'structure.svg';
const index = 1;

export {
  ReactComponentGenerator as generator,
  componentOptionsConfig as options,
  StructureQuestions as params,
  description,
  icon,
  index,
};
