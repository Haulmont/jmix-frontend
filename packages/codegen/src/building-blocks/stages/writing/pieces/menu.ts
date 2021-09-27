import {addRoute, addToMenu, RouteInfo, addToAppMenu, addAppMenuItem, AppMenuItemInfo} from "../../../../generators/react-typescript/common/menu";
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

export function addAppMenu(
  gen: YeomanGenerator,
  dirShift: string,
  className: string,
  menuItem: string | null,
  addAppMenuCallback: (
    appMenuContents: string,
    appMenuItemInfo: AppMenuItemInfo,
  ) => string = addAppMenuItem,
  customComponentParams?: any
) {
  if (!addToAppMenu(gen.fs, {
      componentClassName: className,
      dirShift: dirShift,
      destRoot: gen.destinationRoot(),
      menuNode: menuItem,
    },
    addAppMenuCallback,
    customComponentParams
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
