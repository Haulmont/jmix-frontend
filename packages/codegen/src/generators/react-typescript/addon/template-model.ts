import path from "path";
import {Options} from "./options"

export interface TemplateModel {
  addonName: string,
  screenNames: string[],
  messages: Record<string, Record<string, string>>,
  relDirShift: string,
  addonPackageName: string,
  paletteComponentName?: string
}

export async function deriveTemplateModel(
  {dest, addonPackageName}: Options,
  answers: {},
  ): Promise<TemplateModel> {
    const relDirShift = 'src';
    const pathToAddonPackage = path.join(
      process.cwd(),
      'node_modules', 
      addonPackageName,
      'amplicode.addon-metadata.json'
    );
    const addonMetadata = require(pathToAddonPackage);
    return {...addonMetadata, relDirShift, addonPackageName} ;
}
