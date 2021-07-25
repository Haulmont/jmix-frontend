import {addRoute, addToMenu, RouteInfo, addToAppMenu, addAddonToMenu, addAppMenuItem, AppMenuItemInfo, MenuItemTypes, addAddonRoute, AddonInfo} from "../../../../generators/react-typescript/common/menu";
import {YeomanGenerator} from "../../../YeomanGenerator";

export function addMenuItem(
  gen: YeomanGenerator,
  dirShift: string,
  className: string,
  nameLiteral: string,
  addRouteCallback: (
    routingContents: string,
    routeInfo: RouteInfo,
    customComponentParams?: any
  ) => string = addRoute,
  customComponentParams?: any
) {
  if (!addToMenu(gen.fs, {
      componentFileName: className,
      componentClassName: className,
      caption: className,
      dirShift: dirShift,
      destRoot: gen.destinationRoot(),
      menuLink: '/' + nameLiteral,
      pathPattern: '/' + nameLiteral
    },
    addRouteCallback,
    customComponentParams
  )) {
    gen.log('Unable to add component to menu: route registry not found');
  }
}

export function addAddomMenuItem(
  gen: YeomanGenerator,
  dirShift: string,
  addonName: string,
  pathToAddon: string
) {
  if (!addAddonToMenu(gen.fs, {
      addonName,
      pathToAddon,
      dirShift,
      destRoot: gen.destinationRoot(),
    },
    addAddonRoute
  )) {
    gen.log('Unable to add component to menu: route registry not found');
  }
}

export function addAppMenu(
  gen: YeomanGenerator,
  dirShift: string,
  className: string,
  menuItem: string | null,
  menuItemType: MenuItemTypes = MenuItemTypes.MenuItem,
  key: string | null = null,
  addAppMenuCallback: (
    appMenuContents: string,
    appMenuItemInfo: AppMenuItemInfo,
  ) => string = addAppMenuItem,
) {
  if (!addToAppMenu(gen.fs, {
      componentClassName: className,
      dirShift: dirShift,
      destRoot: gen.destinationRoot(),
      menuNode: menuItem,
      menuItemType,
      key
    },
    addAppMenuCallback
  )) {
    gen.log('Unable to add component to menu: route registry not found');
  }
}

export function addEntityMenuItem(
  gen: YeomanGenerator,
  dirShift: string,
  className: string,
  nameLiteral: string,
  addRouteCallback: (
    routingContents: string,
    routeInfo: RouteInfo,
    customComponentParams?: any
  ) => string = addRoute,
  customComponentParams?: any
) {
  if (!addToMenu(gen.fs, {
      componentFileName: className,
      componentClassName: className,
      caption: className,
      dirShift: dirShift,
      destRoot: gen.destinationRoot(),
      menuLink: '/' + nameLiteral,
      pathPattern: '/' + nameLiteral + '/:entityId?'
    },
    addRouteCallback,
    customComponentParams
  )) {
    gen.log('Unable to add component to menu: route registry not found');
  }
}
