import path from "path";
import {Options} from "./options"

export interface TemplateModel {
  addonName: string,
  screenNames: string[],
  messages: Record<string, Record<string, string>>,
  relDirShift: string,
}

export async function deriveTemplateModel(
  {dest, dirShift, addonPackageName}: Options,
  answers: {},
  ): Promise<TemplateModel> {
    const relDirShift =  dirShift ?? '';
    const pathToAddonPackage = path.join(
      dest ?? '', 
      relDirShift, 
      '../node_modules', 
      addonPackageName,
      'amplicode.addon-metadata.json'
    );
    
    const addonMetadata = require(pathToAddonPackage);
    return {...addonMetadata, relDirShift} ;
}
