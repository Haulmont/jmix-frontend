import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {componentOptionsConfig} from "../../../common/cli-options";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {getAnswersFromPrompt, allQuestions, EntityMasterDetailAnswers } from "./answers";
import path from "path";
import {MasterDetailTemplateModel, deriveMasterDetailTemplateModel} from "./template-model";
import {writeMasterDetail} from "./write";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

export class ReactEntityMasterDetailGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<ComponentOptions, EntityMasterDetailAnswers, MasterDetailTemplateModel>(
      {
        templateDir: path.join(__dirname, 'template'),
        questions: allQuestions,
        stages: {
          getAnswersFromPrompt,
          deriveTemplateModel: deriveMasterDetailTemplateModel,
          write: writeMasterDetail,
        }
      },
      this
    );
  }
}

const description = 'Combined screen with the browser on the left and the editor on the right.';

export {
  ReactEntityMasterDetailGenerator as generator,
  componentOptionsConfig as options,
  allQuestions as params,
  description
}