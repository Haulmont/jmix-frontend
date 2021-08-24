import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useIntl } from "react-intl"
import { RouteItem, SubMenu } from "@haulmont/jmix-react-core";
import { menuItems, openScreen } from "../../screen-registration/screen-registration";

interface Props<T> {
  screenId?: string;
  caption: string;
  children?: React.ReactNode;
  onClick?: T
}

export const useMenuItem = <T extends (info: any) => void>({ screenId, caption, onClick, children }: Props<T>): [
  string,
  React.ReactNode,
  T
] => {
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
        openScreen(screenId, menuLink);
      }
    }
  }, [currentMenuItem, screenId]);

  const childrenWithCaption = useMemo(() => {
    return React.Children.toArray([formattedCaption, children])
  }, [formattedCaption, children]);

  const menuItemOnClick = useCallback((menuInfo) => {
    menuItemDefaultHandler();
    onClick?.(menuInfo);
  }, [menuItemDefaultHandler, onClick])

  return [
    formattedCaption,
    childrenWithCaption,
    (menuItemOnClick as T)
  ]
}
