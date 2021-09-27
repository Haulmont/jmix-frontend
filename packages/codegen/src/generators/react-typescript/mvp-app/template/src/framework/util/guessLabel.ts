export function guessLabel(propertyName: string): string {
  const split = propertyName.replace(/([^A-Z])([A-Z])/g, '$1 $2');
  return split[0].toUpperCase() + split.slice(1);
}
