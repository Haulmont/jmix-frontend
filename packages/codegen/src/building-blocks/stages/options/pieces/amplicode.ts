import {OptionsConfig} from "../../../../common/cli-options";
import {DirShiftOption} from "./dir-shift";

export interface AmplicodeCommonOptions {
  dest?: string;
  schema?: string;
  answers?: string;
  verbose?: boolean;
}

export const amplicodeCommonOptionsConfig: OptionsConfig = {
  dest: {
    alias: 'd',
    description: 'destination directory',
    type: String
  },
  schema: {
    alias: 's',
    description: 'specify path to GraphQL schema',
    type: String
  },
  answers: {
    alias: 'a',
    description: 'fulfilled params for generator to avoid interactive input in serialized JSON string',
    type: String
  },
  verbose: {
    alias: 'b',
    description: 'log out additional info about generation process',
    type: Boolean
  },
};

export interface AmplicodeComponentOptions extends AmplicodeCommonOptions, DirShiftOption {}

export const amplicodeComponentOptionsConfig: OptionsConfig = {
  ...amplicodeCommonOptionsConfig,
  dirShift: {
    alias: 's',
    description: 'directory shift for html imports e.g ../../',
    type: String
  }
};

