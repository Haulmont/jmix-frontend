import {OptionsConfig} from "../../../../common/cli-options";
import {DirShiftOption} from "./dir-shift";

export interface MvpCommonOptions {
  dest?: string;
  schema?: string;
  answers?: string;
  verbose?: boolean;
}

export const mvpCommonOptionsConfig: OptionsConfig = {
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

export interface MvpComponentOptions extends MvpCommonOptions, DirShiftOption {}

export const mvpComponentOptionsConfig: OptionsConfig = {
  ...mvpCommonOptionsConfig,
  dirShift: {
    alias: 's',
    description: 'directory shift for html imports e.g ../../',
    type: String
  }
};

