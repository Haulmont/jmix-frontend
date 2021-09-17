import path from "path";
import {Editor} from "mem-fs-editor";
import uuid from 'uuid'
import {convertToUnixPath} from "../../../common/utils";
import jscodeshift, {JSXElement, JSXAttribute, stringLiteral, Collection } from 'jscodeshift'

export interface AddMenuItemConfig {
  horizontalMenuComponentName?: string;
  verticalMenuComponentName?: string;
  subMenuItemComponentName?: string;
  getMenuItem?: (componentClassName: string, key: string) => string;
  getSubMenuItem?: (caption: string, key: string, children?: string) => string;
}

interface AddToMenuOpts {
  destRoot: string;
  dirShift: string | undefined;
}

interface ComponentInfo {
  componentFileName: string;
  componentClassName: string;
  menuLink: string;
  pathPattern: string;
  caption: string;
}

export interface AddonInfo {
  addonName: string,
  pathToAddon: string
}

export interface AppMenuItemInfo {
  componentClassName: string;
  menuNode: string | null;
  key: string | null,
  menuItemType: MenuItemTypes
}

export enum MenuItemTypes {
  MenuItem = 'MenuItem',
  SubMenuItem = "SubMenuItem"
}

export function addToMenu(
  fs: Editor,
  {
    destRoot,
    dirShift,
    caption,
    menuLink,
    pathPattern,
    componentFileName,
    componentClassName
  }: AddToMenuOpts & ComponentInfo,
  addRouteCallback: (
    routingContents: string,
    routeInfo: RouteInfo,
    customComponentParams?: {[param: string]: unknown}
  ) => string = addRoute,
  customComponentParams?: {[param: string]: unknown}
): boolean {

  const routingDir = path.join(destRoot, dirShift ? dirShift : '');
  const routingPath = path.join(routingDir, 'routing.ts');
  const componentPath = `./${getRelativePath(routingDir, destRoot)}/${componentFileName}`;

  if (fs.exists(routingPath)) {
    const routingContents = fs.read(routingPath);
    fs.write(
      routingPath,
      addRouteCallback(
        routingContents,
        {caption, menuLink, pathPattern, componentClassName, componentFileName, componentPath},
        customComponentParams
      ));
    return true;
  } else {
    return false;
  }
}

export function addAddonToMenu (
  fs: Editor,
  {
    addonName,
    pathToAddon,
    dirShift,
    destRoot
  } : AddToMenuOpts & AddonInfo,
  addAddonRouteCallback: (
    routingContents: string,
    addonInfo: AddonInfo
  ) => string = addAddonRoute,
): boolean {
  const routingDir = path.join(destRoot, dirShift ? dirShift : '');
  const routingPath = path.join(routingDir, 'routing.ts');

  if (fs.exists(routingPath)) {
    const routingContents = fs.read(routingPath);
    fs.write(
      routingPath,
      addAddonRouteCallback(
        routingContents,
        {addonName, pathToAddon}
      ));
    return true;
  } else {
    return false;
  }
}

export type RouteInfo = ComponentInfo & {
  componentPath: string,
  pathPattern: string
}

export const addRoute = (
  routingContents: string,
  {
    caption: _caption,
    pathPattern: _pathPattern,
    menuLink: _menuLink,
    componentClassName: _componentClassName,
    componentPath
  }: RouteInfo
) => `` +
`import '${componentPath}';
${routingContents}`;

export const addAddonRoute = (routingContents: string,
  {
    addonName: _addonName, 
    pathToAddon
  }: AddonInfo) => {
    const uodatedRoutingContent = `
    import '${pathToAddon}';
    ${routingContents}`;

    return uodatedRoutingContent;
  }

export const addAppMenuItem = (appMenuContents: string,
  {
    componentClassName,
    menuNode,
    key,
    menuItemType
  }: AppMenuItemInfo,
  config: AddMenuItemConfig) => {

    return updateAppMenuContent(
      appMenuContents, 
      componentClassName, 
      menuNode,
      key ?? uuid.v4(),
      menuItemType,
      config
    );

  }

function getUpdatedAppMenuContent(
  appMenuContents: string,
  menuNode: string,
  componentClassName: string,
  menuItemType: MenuItemTypes,
  key: string,
  config?: AddMenuItemConfig
): string {
  const tsxParser = jscodeshift.withParser('tsx');
  const appMenuAST = tsxParser(appMenuContents);

  const newMenuItem = getNewMenuItem(componentClassName, key, menuItemType, '', config);

  if(menuNode === "ROOT") {
    return getUpdatedMenuWithRootNode(appMenuAST, newMenuItem, config);
  }
  if(menuNode === "ADDON") {
    return getUpdatedMenuWithAddonNode(appMenuAST, newMenuItem, config);
  }
  return getUpdatedMenuWithCustomNode(appMenuAST, menuNode, newMenuItem, config);
}

export function updateAppMenuContent(
  appMenuContents: string, 
  componentClassName: string, 
  menuNode: string | null,
  key: string ,
  menuItemType: MenuItemTypes = MenuItemTypes.MenuItem,
  config?: AddMenuItemConfig
) {
  return menuNode 
    ?  getUpdatedAppMenuContent(
         appMenuContents, 
         menuNode, 
         componentClassName,
         menuItemType,
         key,
         config
      )
    : appMenuContents
}

export function getNewMenuItem(
  componentClassName: string, 
  key: string, 
  menuItemType: MenuItemTypes,
  children?: string,
  config?: AddMenuItemConfig
) : string {
  switch(menuItemType) {
    case MenuItemTypes.MenuItem: return (config?.getMenuItem ?? getMenuItem)(componentClassName, key);
    case MenuItemTypes.SubMenuItem: return (config?.getSubMenuItem ?? getSubMenuItem)(componentClassName, key, children);
  }
}

export function getMenuItem(componentClassName: string, key: string) : string {
  return `
    <MenuItem 
      screenId={"${componentClassName}"}
      icon={<BarsOutlined />}
      caption={"screen.${componentClassName}"}
      key={'${key}'}
    />`
}

export function getSubMenuItem(caption: string, key: string, children: string = "") : string {
  return `
    <SubMenuItem 
      caption={"${caption}"}
      key={"${key}"}
    >
      ${children}
    </SubMenuItem >`
}

export function pushStringNodeToParentChildren(parrent: Collection<JSXElement>, stringNode: string) : string {
  const parrentPaths = parrent.paths();
    
  if(parrentPaths.length){
    const [{value: {children}}] = parrentPaths;
    children?.push(stringLiteral(stringNode));
    return parrent.toSource();
  }
  return parrent.toSource();
}

export function getUpdatedMenuWithRootNode(
  appMenuAST: Collection<any>, 
  newMenuItem: string,
  config?: AddMenuItemConfig
) : string {
  const verticalMenu = appMenuAST.findJSXElements(config?.verticalMenuComponentName ?? 'VerticalMenu');
  if(verticalMenu.length){
    return pushStringNodeToParentChildren(verticalMenu, newMenuItem);
  }

  const horizontalMenu = appMenuAST.findJSXElements(config?.horizontalMenuComponentName ?? 'HorizontalMenu');
  if(horizontalMenu.length){
    return pushStringNodeToParentChildren(horizontalMenu, newMenuItem);
  }

  return appMenuAST.toSource();
}

export function getUpdatedMenuWithCustomNode(
  appMenuAST: Collection<any>,
  menuNode: string,
  newMenuItem: string,
  config?: AddMenuItemConfig
) : string {
  const parrentSubMenuItem = appMenuAST
    .findJSXElements(config?.subMenuItemComponentName ?? "SubMenuItem")
    .find(JSXAttribute, {
      name: {
        type: "JSXIdentifier",
        name: "key"
      },
      value: {
        type: "JSXExpressionContainer",
        expression: {
          type: 'StringLiteral',
          value: menuNode
        }
      }
    })
    .closest(JSXElement)
    
    return pushStringNodeToParentChildren(parrentSubMenuItem, newMenuItem);
}

export function getUpdatedMenuWithAddonNode(
  appMenuAST: Collection<any>,
  newMenuItem: string,
  config?: AddMenuItemConfig
) : string {
  let parrentNode = findSubMenuItemByKey(appMenuAST, 'addons', config);
  if(parrentNode.length === 0) {
    parrentNode = findRootMenuNode(appMenuAST, config);
    const addonSubMenuItem = getSubMenuItem('addons.Addons', 'addons', newMenuItem);
    return pushStringNodeToParentChildren(parrentNode, addonSubMenuItem);
  }
    
    return pushStringNodeToParentChildren(parrentNode, newMenuItem);
}

function findSubMenuItemByKey(appMenuAST: Collection<any> ,key: string, config?: AddMenuItemConfig): Collection<JSXElement> {
  return appMenuAST
    .findJSXElements(config?.subMenuItemComponentName ?? "SubMenuItem")
    .find(JSXAttribute, {
      name: {
        type: "JSXIdentifier",
        name: "key"
      },
      value: {
        type: "JSXExpressionContainer",
        expression: {
          type: 'StringLiteral',
          value: 'addons'
        }
      }
    })
    .closest(JSXElement);
}

function findRootMenuNode(appMenuAST: Collection<any>, config?: AddMenuItemConfig): Collection<JSXElement> {
  const verticalMenu = appMenuAST.findJSXElements(config?.verticalMenuComponentName ?? 'VerticalMenu');
  if(verticalMenu.length){
    return verticalMenu;
  }
  return appMenuAST.findJSXElements(config?.horizontalMenuComponentName ?? 'HorizontalMenu');
}

function getRelativePath(routingDir: string, destRoot: string) {
  return convertToUnixPath(path.relative(routingDir, destRoot));
}
