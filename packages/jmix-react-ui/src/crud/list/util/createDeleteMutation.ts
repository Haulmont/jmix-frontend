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
