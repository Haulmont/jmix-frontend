import path from "path";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {Options, removeAddonOptions} from "./options";
import {write} from "./write";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";

export class ReactTSRemoveAddonGenerator extends YeomanGenerator {

  constructor(args: string | string[], options: Options) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<Options, {}, {}>({
      templateDir: path.join(__dirname, 'template'),
      stages: {
        write
      }
    }, this);
  }
}

export {
  ReactTSRemoveAddonGenerator as generator,
  removeAddonOptions as options
};
