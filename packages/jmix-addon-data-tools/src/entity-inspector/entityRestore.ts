import { useMutation, gql } from "@apollo/client";
import { useCallback, useMemo } from "react";

type RestoreEntitiesVariables = {
  className: string;
  ids: string[];
}

export function useEntityRestore(restoreEntitesVariables: RestoreEntitiesVariables) {
  const {className, ids} = restoreEntitesVariables;
  const gqlRestoreEntity = useMemo(() => {
    return gql`
      mutation  RestoreEntities(
        $className: String!, $ids: [String]!
      ) {
        restoreEntities(className: $className, ids: $ids)
      }`
  }, [className, ids]);

  const [restoreEntities] = useMutation<number, RestoreEntitiesVariables>(gqlRestoreEntity);

  const restore = useCallback(() => {
    restoreEntities({
      variables: {
        className, 
        ids
      }
    });
  }, [className, ids]);
  return restore;
}
