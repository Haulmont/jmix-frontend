import {removeAddonsPalette, removeAddonImport} from "../../../building-blocks/stages/writing/pieces/addons";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {TemplateModel} from "./template-model";

export async function write (
  templateModel: TemplateModel, gen: YeomanGenerator
) {
    const {relDirShift, addonPackageName} = templateModel;
    removeAddonImport(gen, relDirShift, addonPackageName);
    removeAddonsPalette(gen, relDirShift, addonPackageName);
}
