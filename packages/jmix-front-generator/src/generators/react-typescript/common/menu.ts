import path from "path";
import Generator from "yeoman-generator";
import uuid from 'uuid'
import {convertToUnixPath} from "../../../common/utils";
import jscodeshift, {JSXElement, JSXAttribute, stringLiteral, Collection } from 'jscodeshift'

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

export interface AppMenuItemInfo {
  componentClassName: string;
  menuNode: string | null;
}

export function addToMenu<T>(
  fs: Generator.MemFsEditor,
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

export function addToAppMenu<T>(
  fs: Generator.MemFsEditor,
  {
    destRoot,
    dirShift,
    menuNode,
    componentClassName
  }: AddToMenuOpts & AppMenuItemInfo,
  addAppMenuCallback: (
    appMenuContents: string,
    appMenuItemInfo: AppMenuItemInfo,
    customComponentParams?: {[param: string]: unknown}
  ) => string = addAppMenuItem,
  customComponentParams?: {[param: string]: unknown}
): boolean {

  const appMenuDir = path.join(destRoot, dirShift ? dirShift : '');
  const appMenuPath = path.join(appMenuDir, 'app', 'AppMenu.tsx');

  if (fs.exists(appMenuPath)) {
    const appMenuContents = fs.read(appMenuPath);
    fs.write(
      appMenuPath,
      addAppMenuCallback(
        appMenuContents,
        {componentClassName, menuNode},
        customComponentParams
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


export const addRoute = (routingContents: string,
                  {
                    caption,
                    pathPattern,
                    menuLink,
                    componentClassName,
                    componentPath
                  }: RouteInfo) => `` +
`import '${componentPath}';
${routingContents}`;

export const addAppMenuItem = (appMenuContents: string,
  {
    componentClassName,
    menuNode
  }: AppMenuItemInfo) => {

    return updateAppMenuContent(appMenuContents, componentClassName, menuNode, uuid.v4());

  }

function getUpdatedAppMenuContent(appMenuContents: string, menuNode: string, componentClassName: string, key: string): string {

  const tsxParser = jscodeshift.withParser('tsx');
  const appMenuAST = tsxParser(appMenuContents);

  const newMenuItem = getNewMenuItem(componentClassName, key);

  if(menuNode === "ROOT") {
    return getUpdatedMenuWithRootNode(appMenuAST, newMenuItem);
  }
  return getUpdatedMenuWithCustomNode(appMenuAST, menuNode, newMenuItem);
}

export function updateAppMenuContent(appMenuContents: string, componentClassName: string, menuNode: string | null, key: string) {
  return menuNode 
    ?  getUpdatedAppMenuContent(
         appMenuContents, 
         menuNode, 
         componentClassName,
         key
      )
    : appMenuContents
}

export function getNewMenuItem(componentClassName: string, key: string) : string {
  return `
    <MenuItem 
      screenId={"${componentClassName}"}
      icon={<BarsOutlined />}
      caption={<FormattedMessage id={"router.${componentClassName}"} />}
      key={'${key}'}
    />`
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

export function getUpdatedMenuWithRootNode(appMenuAST: Collection<any>, newMenuItem: string) : string {
  const verticalMenu = appMenuAST.findJSXElements('VerticalMenu');
  if(verticalMenu.length){
    return pushStringNodeToParentChildren(verticalMenu, newMenuItem);
  }

  const horizontalMenu = appMenuAST.findJSXElements('HorizontalMenu');
  if(horizontalMenu.length){
    return pushStringNodeToParentChildren(horizontalMenu, newMenuItem);
  }

  return appMenuAST.toSource();
}

export function getUpdatedMenuWithCustomNode(appMenuAST: Collection<any>, menuNode: string, newMenuItem: string) : string {
  const parrentSubMenuItem = appMenuAST
    .findJSXElements("SubMenuItem")
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

function getRelativePath(routingDir: string, destRoot: string) {
  return convertToUnixPath(path.relative(routingDir, destRoot));
}
