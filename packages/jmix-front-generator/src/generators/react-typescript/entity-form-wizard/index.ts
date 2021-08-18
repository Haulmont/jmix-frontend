import {componentOptionsConfig} from "../../../common/cli-options";
import * as path from "path";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {formWizardQuestions, FormWizardAnswers, getAnswersFromPrompt} from "./answers";
import { Options } from "./options";
import {TemplateModel, deriveTemplateModel} from "./template-model";
import {write} from "./write";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { ComponentOptions } from "../../../building-blocks/stages/options/pieces/component";

export class ReactEntityManagementGenerator extends YeomanGenerator {

  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<Options, FormWizardAnswers, TemplateModel>({
      templateDir: path.join(__dirname, 'template'),
      questions: formWizardQuestions, // Used when refining answers
      stages: { // Using custom implementations for some of the stages
        getAnswersFromPrompt,
        deriveTemplateModel,
        write
      }
    }, this);
  }
}

const description = 'Screen for editing a specific entity step by step';
const icon = 'entity-form-wizard.svg';
const index = 3;

export {
  ReactEntityManagementGenerator as generator,
  componentOptionsConfig as options,
  formWizardQuestions as params,
  description,
  icon,
  index
};
