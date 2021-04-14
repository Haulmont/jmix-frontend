import {toFatSnakeCase} from "../../../util/to-fat-snake-case";
import {unCapitalizeFirst} from "../../../../common/utils";
import {dollarsToUnderscores} from "../../../util/dollars-to-underscores";

export type UtilTemplateModel = {
  toFatSnakeCase: (str: string) => string;
  unCapitalizeFirst: (str: string) => string;
  dollarsToUnderscores: (str: string) => string;
};

/**
 * You can add this to your TemplateModel if you want to use these utilities inside your
 * template.
 */
export const templateUtilities: UtilTemplateModel = {
  toFatSnakeCase,
  unCapitalizeFirst,
  dollarsToUnderscores
};