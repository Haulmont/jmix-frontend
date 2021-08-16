import {NotificationType, notifications} from "../../../ui/notifications";
import { useIntl } from "react-intl";
import { useCallback } from 'react';

export function useSubmitFailedCallback(): () => void {
  const intl = useIntl();
  const onSubmitFailed = useCallback(() => {
    notifications.show({
      type: NotificationType.ERROR,
      description: intl.formatMessage({ id: "management.editor.validationError" })
    });
  }, [intl, notifications]);
  return onSubmitFailed;
}
