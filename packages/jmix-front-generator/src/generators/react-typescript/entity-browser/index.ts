import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {componentOptionsConfig} from "../../../common/cli-options";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {getAnswersFromPrompt, commonEntityBrowserQuestions, EntityBrowserAnswers } from "./answers";
import path from "path";
import {EntityBrowserTemplateModel, deriveBrowserTemplateModel} from "./template-model";
import {writeBrowser} from "./write";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

export class ReactEntityBrowserGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<ComponentOptions, EntityBrowserAnswers, EntityBrowserTemplateModel>(
      {
        templateDir: path.join(__dirname, 'template'),
        questions: commonEntityBrowserQuestions,
        stages: {
          getAnswersFromPrompt,
          deriveTemplateModel: deriveBrowserTemplateModel,
          write: writeBrowser,
        }
      },
      this
    );
  }
}

const description = 'Read-only set of entities displayed as table, cards or list.';
const icon = 'entity-browser.svg'
const index = 4;

export {
  ReactEntityBrowserGenerator as generator,
  componentOptionsConfig as options,
  commonEntityBrowserQuestions as params,
  description,
  icon,
  index,
}