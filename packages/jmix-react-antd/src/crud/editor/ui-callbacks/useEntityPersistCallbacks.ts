import {NotificationType, notifications} from "../../../ui/notifications";
import {useIntl} from "react-intl";
import {useCallback} from 'react';
import {PersistEntityCallbacks} from "@haulmont/jmix-react-web";

export function useEntityPersistCallbacks(): PersistEntityCallbacks {
  const intl = useIntl();

  const onCreate = useCallback(() => {
    notifications.show({
      type: NotificationType.SUCCESS,
      description: intl.formatMessage({ id: "management.editor.created" })
    })
  }, [notifications, intl]);

  const onEdit = useCallback(() => {
    notifications.show({
      type: NotificationType.SUCCESS,
      description: intl.formatMessage({ id: "management.editor.updated" })
    })
  }, [notifications, intl]);

  const onError = useCallback(() => {
    notifications.show({
      type: NotificationType.ERROR,
      description: intl.formatMessage({ id: "common.requestFailed" })
    })
  }, [notifications, intl]);

  return {onCreate, onEdit, onError};
}
