import {NotificationType, notifications} from "../../../ui/notifications";
import { useIntl } from "react-intl";
import { useCallback } from "react";

export function useOpenScreenErrorCallback(): (entityName: string) => void {
  const intl = useIntl();

  const onOpenScreenError = useCallback((entityName: string) => {
    notifications.show({
      type: NotificationType.SUCCESS,
      description: intl.formatMessage(
        { id: 'editor.doesNotExist' }, 
        {entityName}
      )
    })
  }, [intl, notifications]);
  return onOpenScreenError;
}
