import path from "path";
import Generator from "yeoman-generator";
import { convertToUnixPath } from "../../../common/utils";
import jscodeshift, {
  identifier,
  stringLiteral,
  ImportDeclaration,
  importSpecifier,
  importDefaultSpecifier, 
  importDeclaration, 
  Collection
} from "jscodeshift"

interface registerComponentOpts {
  destRoot: string;
  dirShift: string | undefined;
}

interface ComponentInfo {
  componentFileName: string;
  componentClassName: string;
  pathPattern: string;
}

export function registerComponentPreviews(
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
) => {

  const tsxParser = jscodeshift.withParser('tsx');
  const previewsAST = tsxParser(componentPreviewsContents);

  addComponentImport(previewsAST, isDefaultExport, componentClassName, componentPath);

  const newComponentPreview = getNewComponentPreview(pathPattern, componentClassName, componentProps);
  return addComponentToPreview(previewsAST, newComponentPreview);
} 

function getRelativePath(routingDir: string, destRoot: string) {
  return convertToUnixPath(path.relative(routingDir, destRoot));
}

export function getNewComponentPreview(
  pathPattern: string, 
  componentClassName: string, 
  componentProps?: { [param: string]: unknown }
): string {
  return `
  <ComponentPreview path="${pathPattern}">
    <${componentClassName} ${serializeComponentsProps(componentClassName, componentProps)}/>
  </ComponentPreview>`
}

function addComponentImport(
  previewsAST: Collection<any>, 
  isDefaultExport: boolean, 
  componentClassName: string, 
  componentPath: string
) : string {
  const allPreviewsImports = previewsAST.find(ImportDeclaration);

  const componentImportDeclaration = importDeclaration(
    [isDefaultExport 
      ? importDefaultSpecifier(identifier(componentClassName))
      : importSpecifier(identifier(componentClassName))
    ],
    stringLiteral(componentPath),
    "value"
  );

  allPreviewsImports
    .at(0)
    .insertAfter(componentImportDeclaration)
  
    return allPreviewsImports.toSource();
}

function addComponentToPreview(previewsAST: Collection<any>, newComponent: string) {
  const previews =  previewsAST.findJSXElements("Previews");
  const previewsParrentPaths = previews.paths();
    
  if(previewsParrentPaths.length){
    const [{value: {children}}] = previewsParrentPaths;
    children?.push(stringLiteral(newComponent));
    return previews.toSource();
  }
  return previews.toSource();
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
