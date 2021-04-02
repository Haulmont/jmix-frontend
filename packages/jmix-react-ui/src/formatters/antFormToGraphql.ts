export function antFormToGraphql(
  item: Record<string, any>
): Record<string, any> {
  const result: Record<string, any> = {};

  Object.entries(item).forEach(([attributeName, value]) => {
    // TODO

    result[attributeName] = value;
  });

  return result;
}