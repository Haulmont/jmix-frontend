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

  const deleteEntities = entityIds.map((entityId, index)=> `${graphqlSafeEntityName}${index}: delete_${graphqlSafeEntityName}(id: "${entityId}")`).join('\n')

  const mutationString = `
    mutation Delete_some_${graphqlSafeEntityName} {
      ${deleteEntities}
    }
  `;

  return gql(mutationString);
}
