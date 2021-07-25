import {ProjectModel} from "../../../common/model/cuba-model";
import {Options} from "./options";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import path from "path";

export interface TemplateModel {
  addonName: string,
  screenNames: string[],
  messages: Record<string, Record<string, string>>
}

export async function deriveTemplateModel(
    answers: {}, projectModel: ProjectModel, gen: YeomanGenerator, {addonPackageName, dirShift}: Options
  ): Promise<TemplateModel> {
    const pathToAddonPackage = path.join(
      gen.destinationRoot(), 
      dirShift ?? '', 
      '../node_modules', 
      addonPackageName,
      'jmix.addon-metadata.json'
    );
    
    const addonMetadata = require(pathToAddonPackage);
    return addonMetadata;
}
