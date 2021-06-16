export interface RouteItem {
  pathPattern: string
  menuLink: string
  caption: string
  screenId: string;
}

export interface SubMenu {
  items: Array<RouteItem | SubMenu>
  caption: string
}

const menuItems: Array<RouteItem | SubMenu> = [];

export function getMenuItems() : Array<RouteItem | SubMenu> {
  return menuItems;
}
