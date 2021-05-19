import path from "path";
import Generator from "yeoman-generator";
import {convertToUnixPath} from "../../../common/utils";

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
    caption,
    menuLink,
    pathPattern,
    componentFileName,
    componentClassName
  }: AddToMenuOpts & ComponentInfo,
  addAppMenuCallback: (
    appMenuContents: string,
    routeInfo: RouteInfo,
    customComponentParams?: {[param: string]: unknown}
  ) => string = addAppMenuItem,
  customComponentParams?: {[param: string]: unknown}
): boolean {

  const appMenuDir = path.join(destRoot, dirShift ? dirShift : '');
  const appMenuPath = path.join(appMenuDir, 'app', 'AppMenu.tsx');
  const componentPath = `../../${getRelativePath(appMenuDir, destRoot)}/${componentFileName}`;

  if (fs.exists(appMenuPath)) {
    const appMenuContents = fs.read(appMenuPath);
    fs.write(
      appMenuPath,
      addAppMenuCallback(
        appMenuContents,
        {caption, menuLink, pathPattern, componentClassName, componentFileName, componentPath},
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
    caption,
    pathPattern,
    menuLink,
    componentClassName,
    componentPath
  }: RouteInfo) => {
    const closedAppMenuJsxTag = '</VerticalMenu>';
    const newMenuItem =  `
      <MenuItem 
        screenId={"${componentClassName}"}
      >
        <BarsOutlined />
        <FormattedMessage id={"router.${componentClassName}"} />
      </MenuItem>`
    return getUpdatedAppMenuContent(appMenuContents, newMenuItem)

  }
  function getUpdatedAppMenuContent(appMenuContents: string, newMenuItem: string): string {
    const closedAppMenuJsxTag = '</VerticalMenu>';
    const [mainContent, contentEnd] = appMenuContents.split(closedAppMenuJsxTag);
    return [mainContent + ` ${newMenuItem}`, contentEnd].join(closedAppMenuJsxTag);
  }

function getRelativePath(routingDir: string, destRoot: string) {
  return convertToUnixPath(path.relative(routingDir, destRoot));
}
