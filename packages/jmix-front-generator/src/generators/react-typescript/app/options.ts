import {CommonGenerationOptions, commonGenerationOptionsConfig, OptionsConfig} from "../../../common/cli-options";
import {DirShiftOption} from "../../../building-blocks/stages/options/pieces/dir-shift";

export type Options = CommonGenerationOptions & DirShiftOption;

export const appOptionsConfig: OptionsConfig = {
    ...commonGenerationOptionsConfig,
  answers: {
    alias: 'a',
    description: 'fulfilled params for generator to avoid interactive input in serialized JSON string',
    type: String
  }
}
