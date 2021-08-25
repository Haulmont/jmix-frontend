import { MenuProps } from "antd";
import React from "react";
import { VerticalMenu, MenuItem, SubMenuItem } from "@haulmont/jmix-react-ui";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";
import { tabs } from "@haulmont/jmix-react-core";

export interface AppMenuProps extends MenuProps {}

export const AppMenu = (props: AppMenuProps) => {
  return (
    <VerticalMenu {...props}>
      <MenuItem
        screenId="HomePage"
        icon={<HomeOutlined />}
        caption={"screen.home"}
        key={"home"}
      />
      <MenuItem
        screenId={"MvpScreen"}
        icon={<BarsOutlined />}
        caption={"screen.MvpScreen"}
        key={"f0ccd92e-92d8-4bc4-a5df-95230b730c4e"}
      />
      <MenuItem
        screenId={"MvpScreenEditor"}
        icon={<BarsOutlined />}
        caption={"screen.MvpScreenEditor"}
        key={"34e8a4c7-8f0b-4ef1-ac9a-6869d11c100c"}
      />
    </VerticalMenu>
  );
};
