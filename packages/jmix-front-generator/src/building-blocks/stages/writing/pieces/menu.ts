import {
  addRoute, addToMenu, RouteInfo, addAddonToMenu, addAppMenuItem,
  AppMenuItemInfo, MenuItemTypes, addAddonRoute, AddonInfo, AddMenuItemConfig
} from "../../../../generators/react-typescript/common/menu";
import {YeomanGenerator} from "../../../YeomanGenerator";
import path from "path";

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
  componentClassName: string,
  menuNode: string | null,
  menuItemType: MenuItemTypes = MenuItemTypes.MenuItem,
  key: string | null = null,
  addAppMenuCallback: (
    appMenuContents: string,
    appMenuItemInfo: AppMenuItemInfo,
    config: AddMenuItemConfig
  ) => string = addAppMenuItem,
  config: AddMenuItemConfig | null = null
) {
  const {fs} = gen
  const destRoot = gen.destinationRoot()
  const appMenuDir = path.join(destRoot, dirShift ? dirShift : '');
  const appMenuPath = path.join(appMenuDir, 'app', 'AppMenu.tsx');
  
  if (!fs.exists(appMenuPath)) {
    gen.log('Unable to add component to menu: route registry not found');
    return;
  }

  const appMenuContents = fs.read(appMenuPath);
  fs.write(
    appMenuPath,
    addAppMenuCallback(
      appMenuContents,
      {componentClassName, menuNode, key, menuItemType},
      config ?? {}
    )
  );
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
