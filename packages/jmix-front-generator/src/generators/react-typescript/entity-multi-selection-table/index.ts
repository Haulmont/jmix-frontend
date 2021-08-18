import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {componentOptionsConfig} from "../../../common/cli-options";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {getAnswersFromPrompt, commonEntityBrowserQuestions, MultiSelectionTableAnswers } from "./answers";
import path from "path";
import {MultiSelectionTableTemplateModel, deriveMultiSelectionTableTemplateModel} from "./template-model";
import {writeMultiSelectionTable} from "./write";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

export class ReactEntityBrowserGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<ComponentOptions, MultiSelectionTableAnswers, MultiSelectionTableTemplateModel>(
      {
        templateDir: path.join(__dirname, 'template'),
        questions: commonEntityBrowserQuestions,
        stages: {
          getAnswersFromPrompt,
          deriveTemplateModel: deriveMultiSelectionTableTemplateModel,
          write: writeMultiSelectionTable,
        }
      },
      this
    );
  }
}

const description = 'Makes it possible to select several entities and perform various actions with them.';
const icon = 'entity-multi-selection-table.svg';
const index = 9;

export {
  ReactEntityBrowserGenerator as generator,
  componentOptionsConfig as options,
  commonEntityBrowserQuestions as params,
  description,
  icon,
  index,
}