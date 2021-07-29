import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import path from "path";
import {CommonGenerationOptions, commonGenerationOptionsConfig} from "../../../common/cli-options";
import {EmptyAnswers} from "../../../building-blocks/stages/answers/pieces/EmptyAnswers";
import {EmptyTemplateModel} from "../../../building-blocks/stages/template-model/pieces/EmptyTemplateModel";
import {writeGeneratorCustomization} from "./write";
import { DEFAULT_GROUP } from "../../../building-blocks/default-group";

export class GeneratorCustomizationGenerator extends YeomanGenerator {

  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<
      CommonGenerationOptions, EmptyAnswers, EmptyTemplateModel
    >({
      templateDir: path.join(__dirname, 'template'),
      stages: {
        write: writeGeneratorCustomization
      }
    }, this);
  }
}

const emptyQuestions: never[] = [];
const description = 'Adds ability to customize templates and generators.';
const icon = 'generator-customization.svg';
const index = 100;
export {
  GeneratorCustomizationGenerator as generator,
  commonGenerationOptionsConfig as options,
  emptyQuestions as params,
  description,
  icon,
  index,
  DEFAULT_GROUP as group
};
