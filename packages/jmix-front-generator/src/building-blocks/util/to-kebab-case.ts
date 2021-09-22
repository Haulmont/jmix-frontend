/**
 * Converts from camelCase or PascalCase to kebab-case
 * @param str
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/[A-Z]/g, char => `-${char}`) // precede each uppercase letter with a dash
    .replace(/^-/, '') // if first char is dash - remove it
    .toLowerCase();
}