import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import { mvpComponentOptionsConfig } from "../../../building-blocks/stages/options/pieces/mvp";
import {mvpPipeline} from "../../../building-blocks/pipelines/mvpPipeline";
import path from "path";
import { mvpEntityBrowserQuestions } from "./answers";
import {deriveMvpBrowserTemplateModel} from "./template-model";
import {writeMvpBrowser} from "./write";

export class MvpEntityBrowser extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await mvpPipeline({
      templateDir: path.join(__dirname, 'template'),
      questions: mvpEntityBrowserQuestions,
      stages: {
        deriveTemplateModel: deriveMvpBrowserTemplateModel,
        write: writeMvpBrowser
      }
    }, this);
  }
}

const description = 'Set of entities displayed as cards.';
const icon = 'mvp-entity-browser.svg'
const index = 100;

export {
  MvpEntityBrowser as generator,
  mvpComponentOptionsConfig as options,
  mvpEntityBrowserQuestions as params,
  description,
  icon,
  index
}