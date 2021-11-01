import {CommonGenerationOptions, commonGenerationOptionsConfig} from "../../../common/cli-options";
import {DirShiftOption} from "../../../building-blocks/stages/options/pieces/dir-shift";

export type Options = CommonGenerationOptions & DirShiftOption & {
  addonPackageName: string
};

export const removeAddonOptions = {
  ...commonGenerationOptionsConfig,
  addonPackageName: {
    alias: 'n',
    description: 'npm addon package name',
    type: String
  },
  dirShift: {
    alias: 's',
    description: 'directory shift for html imports e.g ../../',
    type: String
  },
}