import {Options} from "./options"

export interface TemplateModel {
  relDirShift: string,
  addonPackageName: string,
}

export async function deriveTemplateModel(
  {addonPackageName}: Options,
  _answers: {},
): Promise<TemplateModel> {
    const relDirShift = 'src';
    return {
      relDirShift, 
      addonPackageName
    }
}
