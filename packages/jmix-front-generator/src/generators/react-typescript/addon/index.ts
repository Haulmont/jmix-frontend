import path from "path";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {Options, addonOptions} from "./options";
import {TemplateModel, deriveTemplateModel} from "./template-model";
import {write} from "./write";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";

export class ReactTSAddonGenerator extends YeomanGenerator {

  constructor(args: string | string[], options: Options) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<Options, {}, TemplateModel>({
      templateDir: path.join(__dirname, 'template'),
      stages: {
        deriveTemplateModel,
        write
      }
    }, this);
  }
}

export {
  ReactTSAddonGenerator as generator,
  addonOptions as options
};
