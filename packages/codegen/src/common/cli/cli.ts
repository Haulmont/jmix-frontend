import {OptionsConfig} from "../cli-options";
import {StudioTemplateProperty} from "../studio/studio-model";
import {YeomanGenerator} from "../../building-blocks/YeomanGenerator";

export interface GeneratorExports {
  generator: typeof YeomanGenerator,
  options?: OptionsConfig,
  params?: StudioTemplateProperty[],
  description?: string;
  icon?: string;
  index?: number;
}