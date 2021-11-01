import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {removeAddonsPalette, removeAddonImport} from "../../../building-blocks/stages/writing/pieces/addons";
import {Options} from "./options";

export const write: WriteStage<Options, {}> = async (
    projectModel, templateModel, gen, options
  ) => {
    const {dirShift, addonPackageName} = options;
    removeAddonImport(gen, dirShift, addonPackageName);
    removeAddonsPalette(gen, dirShift, addonPackageName);
}
