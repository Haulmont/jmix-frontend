import { useMutation, gql } from "@apollo/client";
import { notifications, NotificationType } from "@haulmont/jmix-react-antd";
import { useCallback } from "react";
import { useIntl } from "react-intl";

type RestoreEntitiesVariables = {
  className: string;
  ids: string[];
}

type RestoreData = {
  restoreEntities: number
}

export function useEntityRestore(restoreEntitesVariables: RestoreEntitiesVariables, onCompleteCallback: () => any) {
  const intl = useIntl();
  const {className, ids} = restoreEntitesVariables;

  const gqlRestoreEntity = gql`
    mutation  RestoreEntities(
      $className: String!, $ids: [String]!
    ) {
        restoreEntities(className: $className, ids: $ids)
    }`;

  const onCompleted = useCallback(({restoreEntities}: RestoreData) => {
    notifications.show({
      type: NotificationType.SUCCESS,
      description: intl.formatMessage({ id: "addons.DataTools.restoreEntites" }, {restoreEntities})
    });
    onCompleteCallback();
  }, [intl, onCompleteCallback]);

  const [restoreEntities] = useMutation<RestoreData, RestoreEntitiesVariables>(gqlRestoreEntity, {onCompleted});

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
