import { useIntl } from "react-intl";
import { ErrorBoundary } from "@haulmont/jmix-react-core";
import { Result } from "antd";
import React from "react";

export const AppErrorBoundary = function(props) {
  const intl = useIntl();

  return (
    <ErrorBoundary
      message={intl.formatMessage({ id: "common.unknownAppError" })}
      render={message => <Result status="warning" title={message} />}
    >
      {props.children}
    </ErrorBoundary>
  );
};
