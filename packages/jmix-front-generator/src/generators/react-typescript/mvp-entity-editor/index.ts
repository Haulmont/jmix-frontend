import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {mvpPipeline} from "../../../building-blocks/pipelines/mvpPipeline";
import path from "path";
import { mvpEntityEditorQuestions } from "./answers";
import { deriveMvpEditorTemplateModel } from "./template-model";
import { mvpComponentOptionsConfig } from "../../../building-blocks/stages/options/pieces/mvp";

export class MvpEntityEditor extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await mvpPipeline({
      templateDir: path.join(__dirname, 'template'),
      questions: mvpEntityEditorQuestions,
      stages: {
        deriveTemplateModel: deriveMvpEditorTemplateModel,
      }
    }, this);
  }
}

const description = 'Standard entity editor screen with a form and action buttons.';
const icon = 'mvp-entity-editor.svg'
const index = 101;

export {
  MvpEntityEditor as generator,
  mvpComponentOptionsConfig as options,
  mvpEntityEditorQuestions as params,
  description,
  icon,
  index
};
