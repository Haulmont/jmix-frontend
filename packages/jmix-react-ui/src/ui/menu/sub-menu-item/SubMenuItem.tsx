import React from "react";
import { Menu, SubMenuProps } from "antd";

interface Props extends SubMenuProps {
  caption: React.ReactNode
}

export const SubMenuItem: React.FC<Props> = ({caption, ...subMenuItemProps}: Props) => {
  return (
    <Menu.SubMenu 
      {...subMenuItemProps}
      title={caption}
    />
  )
}
