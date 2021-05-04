import gql from "graphql-tag";
import {SelectionNode} from "graphql";

/**
 * Parses the provided GraphQL query string and returns an array of top-level attributes.
 *
 * @param query
 */
export function getTopAttributesFromQuery(query: string): string[] {
  const documentNode = gql(query);

  if (!('selectionSet' in documentNode.definitions[0])) {
    throw new Error(`DocumentNode built from provided query string does not contain selectionSet. DocumentNode: ${JSON.stringify(documentNode)}`);
  }

  return documentNode
    .definitions[0]
    .selectionSet
    .selections
    .filter((node: SelectionNode) => 'name' in node)
    .map((node: SelectionNode) => {
      if ('name' in node) {
        return node.name.value;
      }
      // Should be unreachable due to .filter, this code is to avoid compilation error
      throw new Error(`Cannot find name in SelectionNode. DocumentNode: ${JSON.stringify(documentNode)}`);
    });
}