import { normalizeRelativePath, elementNameToClass, unCapitalizeFirst } from "../../../../common/utils";
import { DirShiftOption } from "../../options/pieces/dir-shift";
import * as path from 'path';

const includesPath = (...paths: string[]) => path.join(__dirname, '../../../../building-blocks/includes', ...paths);

export interface CommonTemplateModel {
  componentName: string;
  className: string;
  relDirShift: string;
  nameLiteral: string;
  menuItem: string | null;
  shouldAddToMenu: boolean;
  includesPath: (...paths: string[]) => string;
}

export type EntityCommonAnswers = {
  componentName: string;
  menuItem: string | null;
};

/**
 * To be used in all entity management templates
 *
 * @param options
 * @param answers
 */
 export function deriveEntityCommon<O extends DirShiftOption>(
  options: O, answers: EntityCommonAnswers
): CommonTemplateModel {

  const className = elementNameToClass(answers.componentName);
  const componentName = answers.componentName;
  const relDirShift = normalizeRelativePath(options.dirShift);
  const nameLiteral = unCapitalizeFirst(className);
  const menuItem = answers.menuItem;
  const shouldAddToMenu = true;

  return {
    className,
    componentName,
    relDirShift,
    nameLiteral,
    menuItem,
    shouldAddToMenu,
    includesPath,
  };
}

