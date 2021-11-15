import {TemplateModel} from "./template-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { addAddonPalette, addAddonImport } from "../../../building-blocks/stages/writing/pieces/addons";

export async function write (
  templateModel: TemplateModel, gen: YeomanGenerator
  ) {
    const {relDirShift, addonPackageName, paletteComponentName} = templateModel;
    addAddonImport(gen, relDirShift, addonPackageName);

    if(paletteComponentName != null) {
      addAddonPalette(gen, relDirShift, paletteComponentName, addonPackageName);
    }
}
