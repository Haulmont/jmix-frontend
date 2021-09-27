/**
 * Transforms camelCase and PascalCase to FAT_SNAKE_CASE.
 *
 * @param str
 */
export function toFatSnakeCase(str: string): string {
  return str
    .replace(/[A-Z]/g, char => `_${char}`) // precede each uppercase letter with an underscore
    .replace(/^_/, '') // if first char is underscore - remove it
    .toUpperCase();
}