import {MenuProps} from "antd";
import React from "react";
import { <%= menuType === 'vertical' ? 'VerticalMenu' : 'HorizontalMenu' %>, MenuItem } from "@haulmont/jmix-react-antd";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";

export interface AppMenuProps extends MenuProps {}

export const AppMenu = (props: AppMenuProps) => {
  return (
      <<%= menuType === 'vertical' ? 'VerticalMenu' : 'HorizontalMenu' %> {...props}>
        <MenuItem 
          screenId="HomePage"
          icon={<HomeOutlined />}
          caption={"screen.home"}
          key={"home"}
        />
      </<%= menuType === 'vertical' ? 'VerticalMenu' : 'HorizontalMenu' %>>
  );
};
