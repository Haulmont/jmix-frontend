import {DocumentNode, gql, TypedDocumentNode} from "@apollo/client";
import {dollarsToUnderscores} from "@haulmont/jmix-react-core";

export function createDeleteMutation(entityName: string): DocumentNode | TypedDocumentNode {
  const graphqlSafeEntityName = dollarsToUnderscores(entityName);

  const mutationString = `
    mutation Delete_${graphqlSafeEntityName}($id: String!) {
      delete_${graphqlSafeEntityName}(id: $id)
    }
  `;

  return gql(mutationString);
}

export function createDeleteMutationForSomeEntities(entityName: string, entityIds: string[]): DocumentNode | TypedDocumentNode {
  const graphqlSafeEntityName = dollarsToUnderscores(entityName);

  const mutationString = 
      entityIds.map(entityId => `mutation Delete_${graphqlSafeEntityName} {
        ${`delete_${graphqlSafeEntityName}(id: ${entityId})`}
      }`).join('\n');

  return gql(mutationString);
}
