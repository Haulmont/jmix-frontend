import { normalizeRelativePath, elementNameToClass, unCapitalizeFirst } from "../../../../common/utils";
import { DirShiftOption } from "../../options/pieces/dir-shift";

export interface CommonTemplateModel {
  componentName: string;
  className: string;
  relDirShift: string;
  nameLiteral: string;
}

export type EntityCommonAnswers = {
  componentName: string;
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

  return {
    className,
    componentName,
    relDirShift,
    nameLiteral
  };
}

