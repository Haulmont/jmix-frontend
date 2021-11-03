import React, { ReactNode } from "react";
import { modals } from "@haulmont/jmix-react-antd";
import { useIntl } from "react-intl";

interface Props {
  contentComponent: ReactNode,
  title: ReactNode,
  okText?: ReactNode,
  cancelText?: ReactNode,
}

export const CloseCurrentScreen: React.FC<Props> = ({
  contentComponent,
  title,
  okText,
  cancelText
}) => {
  const intl = useIntl();
  modals.open({
      content: contentComponent,
      title,
      okText: okText ?? intl.formatMessage({ id: "common.ok" }),
      cancelText: cancelText ?? intl.formatMessage({ id: "common.cancel" }),
      onOk: () => {},
      onCancel: () => {}
    });

  return null;
}
