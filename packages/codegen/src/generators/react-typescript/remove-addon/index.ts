import path from "path";
import {amplicodePipeline} from "../../../building-blocks/pipelines/amplicodePipeline";
import {Options, removeAddonOptions} from "./options";
import {write} from "./write";
import {TemplateModel, deriveTemplateModel} from "./template-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";

export class ReactTSRemoveAddonGenerator extends YeomanGenerator {

  constructor(args: string | string[], options: Options) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline<Options, {}, TemplateModel>({
      templateDir: path.join(__dirname, 'template'),
      stages: {
        deriveTemplateModel,
        write
      }
    }, this);
  }
}

export {
  ReactTSRemoveAddonGenerator as generator,
  removeAddonOptions as options
};
