import {DocumentNode} from "graphql";

export function getOperationName(node: DocumentNode): string {
  const operationDefinition = node.definitions[0];
  if (!('selectionSet' in operationDefinition)) {
    throw new Error('Selection set is not found in operation definition');
  }

  const selection = operationDefinition.selectionSet.selections[0];
  if (!('name' in selection)) {
    throw new Error('Name not found');
  }

  return selection.name.value;
}