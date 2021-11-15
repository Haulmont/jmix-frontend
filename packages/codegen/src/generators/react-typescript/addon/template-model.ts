import path from "path";
import {Options} from "./options"

export interface TemplateModel {
  relDirShift: string,
  addonPackageName: string,
  paletteComponentName?: string
}

export async function deriveTemplateModel(
  {addonPackageName}: Options,
  _answers: {},
  ): Promise<TemplateModel> {
    const relDirShift = 'src';
    const pathToAddonPackage = path.join(
      process.cwd(),
      'node_modules', 
      addonPackageName,
      'package.json'
    );
    const {amplicodeAddon} = require(pathToAddonPackage);
    return {
      paletteComponentName: amplicodeAddon?.paletteComponentName, 
      relDirShift, 
      addonPackageName
    }
}
