/**
 * Replaces all occurrences of a dollar sign ($) inside a string with underscores (_).
 *
 * Useful when generating GraphQL templates for an entity that has a dollar sign in its name
 * (e.g. scr$Car), since corresponding GraphQL types will have underscore in its place
 * (e.g. inp_scr_CarOrderBy).
 *
 * @param input
 */
export const dollarsToUnderscores = (input: string): string => {
  return input.replace(/\$/g, '_');
};