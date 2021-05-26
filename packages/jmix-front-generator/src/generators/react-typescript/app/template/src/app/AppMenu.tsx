import React from "react"
import { VerticalMenu, MenuItem, SubMenuItem } from "@haulmont/jmix-react-ui";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";
import {tabs} from '@haulmont/jmix-react-core';
import { FormattedMessage } from "react-intl";

export const AppMenu = () => {
  return (
      <VerticalMenu>
        <MenuItem 
          onClick={tabs.closeAll}
          icon={<HomeOutlined />}
          key={"home"}
        >
          <FormattedMessage id="router.home" />
        </MenuItem>
      </VerticalMenu>
  );
};
