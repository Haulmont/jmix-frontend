import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useIntl } from "react-intl"
import { Menu, MenuItemProps } from "antd";
import { tabs, redirect, RouteItem, SubMenu } from "@haulmont/jmix-react-core";
import { menuItems } from "../../../util/componentsRegistration";


interface Props extends MenuItemProps {
  screenId?: string;
  caption: string
}

export const MenuItem: React.FC<Props> = ({ screenId, caption, title, onClick, children, ...menuItemProps }: Props) => {
  const [currentMenuItem, setCurrentMenuItem] = useState<RouteItem | SubMenu | null>(null);
  const {formatMessage} = useIntl();

  const formattedCaption = useMemo(() => {
    return formatMessage({id: caption, defaultMessage: caption})
  }, [caption])

  useEffect(() => {
    const currentMenuItem: any = screenId
      ? menuItems.find(item => {
        return (item as any)?.screenId === screenId;
      })
      : null;
    setCurrentMenuItem(currentMenuItem);
  }, [screenId]);

  const menuItemDefaultHandler = useCallback(() => {
    if (currentMenuItem) {
      const { component, menuLink } = { ...currentMenuItem }
      tabs.push({
        title: formattedCaption,
        content: component,
        key: menuLink as string
      });
      redirect(menuLink as string);
    }
  }, [currentMenuItem]);

  const childrenWithCaption = useMemo(() => {
    return React.Children.toArray([formattedCaption, children])
  }, [formattedCaption, children]);

  const menuItemOnCLick = useCallback((menuInfo) => {
    menuItemDefaultHandler();
    onClick?.(menuInfo);
  }, [menuItemDefaultHandler, onClick])

  return (
    <Menu.Item
      {...menuItemProps}
      title={title ?? formattedCaption}
      children={childrenWithCaption}
      onClick={menuItemOnCLick}
    />
  )
}
