import React from "react";
import { MenuAccessControl } from "@haulmont/jmix-react-core";

type Props = {
  children: JSX.Element;
  accessKey: string
}

export const MenuPermissionContainer = (props: Props) => {
  const {accessKey, children} = props;

  return process.env.REACT_APP_ENABLE_UI_PERMISSIONS === "true"
    ? (
      <MenuAccessControl
        accessKey={accessKey}
        menuItem={children}
      />
    )
   : children
}
