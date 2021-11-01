import {ProjectModel} from "../../../common/model/cuba-model";
import {Options} from "./options";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import path from "path";

export interface TemplateModel {
  paletteComponentName?: string
}

export async function deriveTemplateModel(
    answers: {}, projectModel: ProjectModel, gen: YeomanGenerator, {addonPackageName, dirShift}: Options
  ): Promise<TemplateModel> {
    const pathToAddonPackage = path.join(
      gen.destinationRoot(), 
      dirShift ?? '', 
      '../node_modules', 
      addonPackageName,
      'package.json'
    );
    
    const {jmixAddon} = require(pathToAddonPackage);
    return {paletteComponentName: jmixAddon?.paletteComponentName};
}
