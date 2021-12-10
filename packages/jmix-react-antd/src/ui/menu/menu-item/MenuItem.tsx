import React from "react";
import { Menu, MenuItemProps } from "antd";
import { useMenuItem, MenuPermissionContainer } from "@haulmont/jmix-react-web";

export interface Props extends MenuItemProps {
  screenId?: string;
  caption: string
}

export const MenuItem: React.FC<Props> = ({ 
  screenId, 
  caption, 
  title, 
  onClick, 
  children,
  ...menuItemProps 
}: Props) => {
  const [
    formattedCaption,
    childrenWithCaption,
    menuItemOnClick
  ] = useMenuItem({ screenId, caption, onClick, children })

  return (
    <MenuPermissionContainer 
      accessKey={menuItemProps.eventKey ?? ""}
    >
      <Menu.Item
        aria-label={" "}
        {...menuItemProps}
        title={title ?? formattedCaption}
        onClick={menuItemOnClick}
      >
        {childrenWithCaption}
      </Menu.Item>
    </MenuPermissionContainer>
  )
}
