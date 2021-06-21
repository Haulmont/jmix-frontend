import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useIntl } from "react-intl"
import { Menu, MenuItemProps } from "antd";
import { RouteItem, SubMenu } from "@haulmont/jmix-react-core";
import {menuItems, openScreenInTab} from "../../../screen-registration/screen-registration";


interface Props extends MenuItemProps {
  screenId?: string;
  caption: string
}

export const MenuItem: React.FC<Props> = ({ screenId, caption, title, onClick, children, ...menuItemProps }: Props) => {
  const [currentMenuItem, setCurrentMenuItem] = useState<RouteItem | SubMenu | null>(null);
  const {formatMessage, locale} = useIntl();

  const formattedCaption = useMemo(() => {
    return formatMessage({id: caption, defaultMessage: caption})
  }, [caption, locale]);

  useEffect(() => {
    const menuItem: any = screenId
      ? menuItems.find(item => {
        return (item as any)?.screenId === screenId;
      })
      : null;
    setCurrentMenuItem(menuItem);
  }, [screenId]);

  const menuItemDefaultHandler = useCallback(() => {
    if (currentMenuItem != null && screenId != null) {
      const { menuLink } = { ...currentMenuItem };
      if (menuLink != null) {
        openScreenInTab(screenId, menuLink);
      }
    }
  }, [currentMenuItem, screenId]);

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
