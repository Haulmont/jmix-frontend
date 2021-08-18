import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {componentOptionsConfig} from "../../../common/cli-options";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {getAnswersFromPrompt, commonEntityEditorQuestions, EntityEditorAnswers } from "./answers";
import path from "path";
import {EntityEditorTemplateModel, deriveEditorTemplateModel} from "./template-model";
import {writeEditor} from "./write";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

export class ReactEntityManagementGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<ComponentOptions, EntityEditorAnswers, EntityEditorTemplateModel>(
      {
        templateDir: path.join(__dirname, 'template'),
        questions: commonEntityEditorQuestions,
        stages: {
          getAnswersFromPrompt,
          deriveTemplateModel: deriveEditorTemplateModel,
          write: writeEditor,
        }
      },
      this
    );
  }
}

const description = 'Standard entity editor screen with a form and action buttons.';
const icon = 'entity-editor.svg';
const index = 2;

export {
  ReactEntityManagementGenerator as generator,
  componentOptionsConfig as options,
  commonEntityEditorQuestions as params,
  description,
  icon,
  index,
}