import React from "react";
import { Menu, SubMenuProps } from "antd";

interface Props extends SubMenuProps {
  children: JSX.Element | JSX.Element[]
}

export const SubMenuItem: React.FC<Props> = ({children, ...subMenuItemProps}: Props) => {
  return (
    <Menu.SubMenu
      {...subMenuItemProps}
    >
      {children}
    </Menu.SubMenu>
  )
}
