import React from "react";
import { Menu, SubMenuProps } from "antd";

interface Props extends SubMenuProps {}

export const SubMenuItem: React.FC<Props> = (subMenuItemProps: Props) => {
  return (
    <Menu.SubMenu {...subMenuItemProps}/>
  )
}
