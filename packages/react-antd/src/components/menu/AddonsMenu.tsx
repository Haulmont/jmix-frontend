import React from "react";
import {useIntl, IntlShape} from "react-intl";
import {
  Menu,
  MenuItemProps,
  SubMenuProps
} from "antd"
import {
  menuStore,
  AddonItem
} from "@amplicode/react-core";
import { observer } from "mobx-react";

type AddonsMenuProps = MenuItemProps | SubMenuProps;

export const AddonsMenu: React.FC = observer((props: AddonsMenuProps) => {
  const intl = useIntl();
  return (
    <>
      {renderAddonMenuItems(menuStore.addonMenuItems, props, intl)}
    </>
  )
});

function renderAddonMenuItems(addonItems: AddonItem[], extProps: AddonsMenuProps, intl: IntlShape): JSX.Element[] | null {
  if(addonItems.length > 0) {
    return addonItems.map((addonItem: AddonItem) => {
      return transformAddonItemToJsx(addonItem, extProps, intl);
    })
  }
  return null
}

function transformAddonItemToJsx(
  itemInfo: AddonItem<MenuItemProps, SubMenuProps>,
  extProps: AddonsMenuProps = {},
  intl: IntlShape
): JSX.Element {
  if (itemInfo.type === "MenuItem") {
    const {
      menuItemProps: {caption, ...restMenuItemProps}
    } = itemInfo;

    return (
      <Menu.Item
        {...(extProps as MenuItemProps)}
        {...restMenuItemProps}
        title={intl.formatMessage({id: caption})}
        eventKey={restMenuItemProps.key}
      >
        {intl.formatMessage({id: caption})}
      </Menu.Item>
    )
  }

  const {
    childItems, 
    subMenuItemProps: {caption, ...restSubMenuItemProps}
  } = itemInfo;
  return (
    <Menu.SubMenu
      {...(extProps as SubMenuProps)}
      {...restSubMenuItemProps}
      title={intl.formatMessage({id: caption})}
    >
      {
        childItems.map((item: AddonItem) => {
          return transformAddonItemToJsx(item, {}, intl)
        })
      }
    </Menu.SubMenu>
  )
}
