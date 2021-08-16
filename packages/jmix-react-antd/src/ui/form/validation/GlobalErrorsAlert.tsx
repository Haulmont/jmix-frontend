import { Alert } from "antd";
import React from "react";
import { JmixServerValidationErrors, MultilineText } from "@haulmont/jmix-react-web";

export interface GlobalErrorsAlertProps {
  serverValidationErrors?: JmixServerValidationErrors;
}

export const GlobalErrorsAlert = (props: GlobalErrorsAlertProps) => {
  const {serverValidationErrors} = props;

  if (serverValidationErrors?.globalErrors == null || serverValidationErrors?.globalErrors.length === 0) {
    return null;
  }

  return (
    <Alert
      message={<MultilineText lines={serverValidationErrors.globalErrors} />}
      type="error"
      style={{ marginBottom: "24px" }}
    />
  );
};