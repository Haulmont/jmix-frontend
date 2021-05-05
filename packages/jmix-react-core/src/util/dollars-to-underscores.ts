// TODO Currently duplicated between jmix-front-generator and jmix-react-core. Probably we should extract utils into a separate lightweight package.
/**
 * Replaces all occurrences of a dollar sign ($) inside a string with underscores (_).
 *
 * @param input
 */
export const dollarsToUnderscores = (input: string): string => {
  return input.replace(/\$/g, '_');
};