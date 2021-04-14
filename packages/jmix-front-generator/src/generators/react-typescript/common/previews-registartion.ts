import * as path from "path";
import * as Generator from "yeoman-generator";
import { convertToUnixPath } from "../../../common/utils";

interface registerComponentOpts {
  destRoot: string;
  dirShift: string | undefined;
}

interface ComponentInfo {
  componentFileName: string;
  componentClassName: string;
  pathPattern: string;
}

export function registerComponentPreviews<T>(
  fs: Generator.MemFsEditor,
  {
    destRoot,
    dirShift,
    pathPattern,
    componentFileName,
    componentClassName
  }: registerComponentOpts & ComponentInfo,
  isDefaultExport: boolean,
  componentProps?: { [param: string]: unknown },
  registerComponentCallback: (
    componentPreviewsContents: string,
    routeInfo: RouteInfo,
    isDefaultExport: boolean,
    componentProps?: { [param: string]: unknown }
  ) => string = addComponent
): boolean {

  let isComponentRegistered: boolean = false;

  const componentPreviewsDir = path.join(destRoot, dirShift ? dirShift : '');
  const componentPreviewsPath = path.join(componentPreviewsDir, 'dev', 'previews.tsx');
  const componentPath = `../${getRelativePath(componentPreviewsDir, destRoot)}/${componentFileName}`;

  if (fs.exists(componentPreviewsPath)) {
    const componentPreviewsContents = fs.read(componentPreviewsPath);
    fs.write(
      componentPreviewsPath,
      registerComponentCallback(
        componentPreviewsContents,
        { pathPattern, componentClassName, componentFileName, componentPath },
        isDefaultExport,
        componentProps
      ));
      isComponentRegistered = true;
  }

  return isComponentRegistered;
}

export type RouteInfo = ComponentInfo & {
  componentPath: string,
  pathPattern: string
}


export const addComponent = (
  componentPreviewsContents: string, {
    pathPattern,
    componentClassName,
    componentPath
  }: RouteInfo,
  isDefaultExport: boolean,
  componentProps?: { [param: string]: unknown }
) => `` + `${generateComponentImport(isDefaultExport, componentClassName,componentPath )}
  ${removeClosedPreviewsJsxElement(componentPreviewsContents)}
    <ComponentPreview path="${pathPattern}">
      <${componentClassName} ${serializeComponentsProps(componentClassName, componentProps)}/>
    </ComponentPreview>
  </Previews>
  ${addClosedBracket(componentPreviewsContents)}
};`

function getRelativePath(routingDir: string, destRoot: string) {
  return convertToUnixPath(path.relative(routingDir, destRoot));
}

function removeClosedPreviewsJsxElement(componentPreviewsContents: string): string {
  return componentPreviewsContents
    .replace("</Previews>;", "")
    .replace("</Previews>", "")
    .replace(" );", "")
    .replace("};", "");
}

function addClosedBracket(componentPreviewsContents: string): string {
  return componentPreviewsContents.includes("return (") ? ");" : "";
}

function serializeComponentsProps(componentClassName:string, componentProps?: { [param: string]: unknown }): string {
  if (componentClassName !== 'HooksPOCEdit') return "";

  return componentProps
    ? Object.entries(componentProps).map(
      ([propName, propValue]) => {
        const serializedPropValue = serializePropValue(propValue);
        return `${propName}={${serializedPropValue}}`;
      }).join(" ")
    : "";
}

function serializePropValue(propValue: unknown): unknown {
  switch (typeof propValue) {
    case 'string': return `'${propValue}'`;
    case 'object': return `${JSON.stringify(propValue)}`;
    case 'function': return `${propValue.toString()}`;
    default: return propValue;
  }
}

function generateComponentImport (isDefaultExport: boolean, componentClassName: string, componentPath: string) :string {
  return isDefaultExport 
  ? `import ${componentClassName} from '${componentPath}'`
  : `import {${componentClassName}} from '${componentPath}'`
}
