import {CommonGenerationOptions, commonGenerationOptionsConfig} from "../../../common/cli-options";

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
