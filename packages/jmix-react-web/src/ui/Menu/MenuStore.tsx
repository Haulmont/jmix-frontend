import { makeObservable, action, observable, computed } from "mobx";

type CommonItemProps = {key: string };

export type AddonMenuItem<MenuItemProps = any> = {
  type: "MenuItem",
  menuItemProps: MenuItemProps & CommonItemProps,
}

export type AddonSubMenuItem<MenuItemProps = any ,SubMenuItemProp = any> = {
  type: "SubMenuItem",
  subMenuItemProps: SubMenuItemProp & CommonItemProps,
  childItems: Array<AddonMenuItem<MenuItemProps> | AddonSubMenuItem<SubMenuItemProp>>
}

export type AddonItem<MenuItemProps = any ,SubMenuItemProp = any> = 
    AddonMenuItem<MenuItemProps> 
  | AddonSubMenuItem<MenuItemProps, SubMenuItemProp>;
class MenuStore {
  private _addonItems: AddonItem[];

  constructor() {
    this._addonItems = [];
    makeObservable<MenuStore, '_addonItems'>(this, {
      _addonItems: observable,
      addAddonItem: action,
      addonMenuItems: computed
    });
  }

  addAddonItem<MenuItemProps = any ,SubMenuItemProp = any>(
    itemInfo: AddonItem<MenuItemProps, SubMenuItemProp>
  ) {
    this._addonItems.push(itemInfo);
  }

  get addonMenuItems(): AddonItem[] {
    return this._addonItems;
  }
}

export const menuStore = new MenuStore();
