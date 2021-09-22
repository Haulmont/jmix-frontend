import {MvpComponentOptions} from "../../../options/pieces/mvp";
import {normalizeRelativePath, splitByCapitalLetter} from "../../../../../common/utils";
import {toKebabCase} from "../../../../util/to-kebab-case";
import {ScreenAnswers} from "../../../answers/mvp/ScreenAnswers";

export interface ScreenTemplateModel {
  componentName: string,
  caption: string,
  route: string,
  relDirShift: string,
  shouldAddToMenu: boolean,
}

export function deriveScreenTemplateModel(options: MvpComponentOptions, answers: ScreenAnswers): ScreenTemplateModel {
  const {componentName, shouldAddToMenu} = answers;

  return {
    relDirShift: normalizeRelativePath(options.dirShift),
    componentName,
    route: toKebabCase(componentName),
    caption: splitByCapitalLetter(componentName),
    shouldAddToMenu
  };
}