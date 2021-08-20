import React from "react";
import { Menu, MenuItemProps } from "antd";
import { useMenuItem } from "@haulmont/jmix-react-web";

interface Props extends MenuItemProps {
  screenId?: string;
  caption: string
}

export const MenuItem: React.FC<Props> = ({ screenId, caption, title, onClick, children, ...menuItemProps }: Props) => {
  const [
    formattedCaption,
    childrenWithCaption,
    menuItemOnClick
  ] = useMenuItem({ screenId, caption, onClick, children })

  return (
    <Menu.Item
      {...menuItemProps}
      title={title ?? formattedCaption}
      children={childrenWithCaption}
      onClick={menuItemOnClick}
    />
  )
}
