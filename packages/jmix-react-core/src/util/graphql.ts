import {dollarsToUnderscores} from "./dollars-to-underscores";
import {DocumentNode, TypedDocumentNode} from "@apollo/client";

export function getListQueryName(entityName: string): string {
  return `${dollarsToUnderscores(entityName)}List`;
}

export function getCountQueryName(entityName: string): string {
  return `${dollarsToUnderscores(entityName)}Count`;
}

/**
 * Note that if entity name had `$` character in it it will be replaced by `_`.
 *
 * @param queryName
 * @param queryTypeSuffix
 */
export function extractEntityName(queryName: string, queryTypeSuffix: 'List' | 'ById') {
  return queryName.split(queryTypeSuffix).slice(0, -1).join();
}

export function editorQueryIncludesRelationOptions(documentNode: DocumentNode | TypedDocumentNode): boolean {
  if (!('selectionSet' in documentNode.definitions[0])) {
    return false;
  }

  return documentNode.definitions[0].selectionSet.selections.length > 1;
}
