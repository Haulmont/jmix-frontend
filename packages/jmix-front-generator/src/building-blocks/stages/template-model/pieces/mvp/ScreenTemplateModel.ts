import {MvpComponentOptions} from "../../../options/pieces/mvp";
import {normalizeRelativePath} from "../../../../../common/utils";

export interface ScreenTemplateModel {
  relDirShift: string;
}

export function deriveScreenTemplateModel(options: MvpComponentOptions): ScreenTemplateModel {
  return {
    relDirShift: normalizeRelativePath(options.dirShift)
  };
}