import React from "react";
import MenuItem, {MenuItemProps as JmixMenuItemProps} from "../menu-item";
import SubMenuItem, {SubMenuItemProps as JmixSubMenuItemProps} from "../sub-menu-item";
import {
  menuStore,
  AddonItem
} from "@haulmont/jmix-react-web";
import { MenuItemProps, SubMenuProps } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

type AddonsMenuProps = MenuItemProps | SubMenuProps;

export const AddonsMenu: React.FC = observer((props: AddonsMenuProps) => {
  return (
    <>
      {renderAddonMenuItems(menuStore.addonMenuItems, props)}
    </>
  )
});

function renderAddonMenuItems(addonItems: AddonItem[], extProps: AddonsMenuProps): JSX.Element[] | null {
  if(addonItems.length > 0) {
    return addonItems.map((addonItem: AddonItem) => {
      return transformAddonItemToJsx(addonItem, extProps);
    })
  }
  return null
}

function transformAddonItemToJsx(
  itemInfo: AddonItem<JmixMenuItemProps, JmixSubMenuItemProps>,
  extProps: AddonsMenuProps = {}
): JSX.Element {
  if (itemInfo.type === "MenuItem") {
    const {menuItemProps} = itemInfo;
    return (
      <MenuItem
        {...(extProps as MenuItemProps)}
        {...menuItemProps}
        icon={menuItemProps.icon ?? <BarsOutlined />}
        key={menuItemProps.key ?? menuItemProps.screenId ?? menuItemProps.caption }
      />
    )
  }

  const {childItems, subMenuItemProps} = itemInfo;
  return (
    <SubMenuItem
      {...(extProps as SubMenuProps)}
      {...subMenuItemProps}
      key={subMenuItemProps.key ?? subMenuItemProps.caption }
    >
      {
        childItems.map((item: AddonItem) => {
          return transformAddonItemToJsx(item)
        })
      }
    </SubMenuItem>
  )
}
