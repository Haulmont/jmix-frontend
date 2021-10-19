import {CommonGenerationOptions, commonGenerationOptionsConfig} from "../../../common/cli-options";
import {DirShiftOption} from "../../../building-blocks/stages/options/pieces/dir-shift";

export type Options = CommonGenerationOptions & {
  addonPackageName: string
};

export const addonOptions = {
  ...commonGenerationOptionsConfig,
  addonPackageName: {
    alias: 'n',
    description: 'npm addon package name',
    type: String
  }
}