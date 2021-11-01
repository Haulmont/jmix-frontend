import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {addAddonImport, addAddonPalette} from "../../../building-blocks/stages/writing/pieces/addons";
import {Options} from "./options";
import {TemplateModel} from "./template-model";

export const write: WriteStage<Options, TemplateModel> = async (
    projectModel, templateModel, gen, options
  ) => {
    const {dirShift, addonPackageName} = options;
    const {paletteComponentName} = templateModel
    addAddonImport(gen, dirShift, addonPackageName);

    if(paletteComponentName != null) {
      addAddonPalette(gen,dirShift, paletteComponentName, addonPackageName);
    }
}
