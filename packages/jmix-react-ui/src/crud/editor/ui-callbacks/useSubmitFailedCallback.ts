import {useCallback} from "react";
import {message} from "antd";
import { useIntl } from "react-intl";

export function useSubmitFailedCallback() {
  const intl = useIntl();

  return useCallback(() => {
    // TODO use UI kit agnostic API
    message.error(
      intl.formatMessage({ id: "management.editor.validationError" })
    );
  }, [intl]);
}