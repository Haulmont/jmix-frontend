import { useMutation, gql, ApolloError } from "@apollo/client";
import { notifications, NotificationType } from "@haulmont/jmix-react-antd";
import { useIntl ,IntlShape } from "react-intl";

type RestoreEntitiesVariables = {
  className: string;
  ids: string[];
}

type RestoreData = {
  restoreEntities: number
}

const gqlRestoreEntity = gql`
mutation  RestoreEntities(
  $className: String!, $ids: [String]!
) {
    restoreEntities(className: $className, ids: $ids)
}`;

export function useEntityRestore(restoreEntitesVariables: RestoreEntitiesVariables, onCompleteCallback?: () => Promise<any>) {
  const intl = useIntl();
  const {className, ids} = restoreEntitesVariables;
  const [restoreEntities] = useMutation<RestoreData, RestoreEntitiesVariables>(
    gqlRestoreEntity,
    {
      fetchPolicy: "no-cache"
    }
  );

  const restore = () => {
    restoreEntities({
      variables: {
        className, 
        ids
      }
    }).then(({data}) => {
      if(data != null) {
        restoreEntitesHandler(data, intl, onCompleteCallback);
      }
    }).catch(({message}: ApolloError) => {
      restoreEntitesErrorHandler(message, intl);
    })
  };

  return restore;
}

function restoreEntitesHandler(
  {restoreEntities}: RestoreData, 
  intl: IntlShape,
  onCompleteCallback?: () => Promise<any>
): void {

  if(restoreEntities === 0) {
    notifications.show({
      type: NotificationType.ERROR,
      description: intl.formatMessage({ id: "addons.DataTools.restoreEntitiesZeroResult" })
    });
    return;
  }

  notifications.show({
    type: NotificationType.SUCCESS,
    description: intl.formatMessage({ id: "addons.DataTools.restoreEntities" })
  });

  onCompleteCallback?.();
}

function restoreEntitesErrorHandler(errorMessage: string, intl: IntlShape) {
  notifications.show({
    type: NotificationType.ERROR,
    description: intl.formatMessage({ id: "addons.DataTools.restoreEntitiesError"}, {errorMessage})
  });
}
