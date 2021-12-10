import React from "react";
import { ScreenAccessControl } from "@haulmont/jmix-react-core";
import {useIntl} from "react-intl";

type Props = {
  children: JSX.Element;
  screenId: string;
}

export const ScreenPermissionContainer = (props: Props) => {
  const {screenId, children} = props;
  const intl = useIntl();
  return process.env.REACT_APP_ENABLE_UI_PERMISSIONS === "true"
    ? (
      <ScreenAccessControl
        screenId={screenId}
        screenContent={children}
        accessLimitedMessage={intl.formatMessage({id: "screen.notAllowed"})}
      />
    )
   : children
}
