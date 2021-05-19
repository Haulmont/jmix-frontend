import React, {useCallback, useState, useEffect} from "react";
import { Menu, MenuItemProps } from "antd";
import { tabs, redirect, RouteItem, SubMenu } from "@haulmont/jmix-react-core";
import { menuItems } from "../../../util/componentsRegistration";

interface Props extends MenuItemProps {
  screenId?: string;
}

export const MenuItem: React.FC<Props> = ({children, screenId, onClick, ...menuItemProps}: Props) => {
  const [currentMenuItem, setCurrentMenuItem] = useState<RouteItem | SubMenu | null>(null);

  useEffect(() => {
    const currentMenuItem: any = screenId 
    ? menuItems.find(item => {
      return (item as any)?.screenId === screenId;
    })
    : null;
    setCurrentMenuItem(currentMenuItem);
  }, [screenId]);

  const menuItemDefaultHandler = useCallback(() => {
    if(currentMenuItem) {
      const {caption, component, menuLink} = {...currentMenuItem}
      tabs.push({
        title: caption as string,
        content: component,
        key: menuLink as string
      });
      redirect(menuLink as string);
    }
  }, [currentMenuItem]);


  const menuItemOnCLick = useCallback((menuInfo) => {
    menuItemDefaultHandler();
    onClick?.(menuInfo);
  }, [menuItemDefaultHandler, onClick])

  return (
    <Menu.Item
      {...menuItemProps}
      onClick = {menuItemOnCLick}
    >
      {children}
    </Menu.Item>
  )
}
