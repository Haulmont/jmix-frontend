import {YeomanGenerator} from "../../../../YeomanGenerator";
import path from "path";
import jscodeshift, {literal, objectProperty, stringLiteral} from "jscodeshift";
// @ts-ignore missing typings
import {describe} from 'jscodeshift-helper';

const j = jscodeshift;

// TODO convert arguments to object
export function addMvpAppMenu(
  gen: YeomanGenerator,
  dirShift: string,
  route: string,
  caption: string,
  componentName: string,
  componentPath: string
) {
  const destRoot = gen.destinationRoot();
  const srcDir = path.join(destRoot, dirShift ? dirShift : '');

  const appMenuPath = path.join(srcDir, 'app', 'AppMenu.tsx');
  if (!gen.fs.exists(appMenuPath)) {
    gen.log('Unable to add component to menu: app menu not found');
    return;
  }
  const appMenuContents = gen.fs.read(appMenuPath);
  let appMenuTransformed;
  appMenuTransformed = transformAddMenuItem(appMenuContents, route);
  appMenuTransformed = transformAddScreenImport(appMenuTransformed, componentName, dirShift);
  gen.fs.write(appMenuPath, appMenuTransformed);

  const screenRegistryFilePath = path.join(srcDir, 'app', 'screenRegistry.ts');
  if (!gen.fs.exists(screenRegistryFilePath)) {
    gen.log('Unable to add component to menu: screen registry not found');
    return;
  }
  const screenRegistryFileContent = gen.fs.read(screenRegistryFilePath);
  let screenRegistryTransformed;
  screenRegistryTransformed = transformAddScreenItem(screenRegistryFileContent, route, caption, componentName);
  screenRegistryTransformed = transformAddScreenImport(screenRegistryTransformed, componentName, componentPath);
  gen.fs.write(screenRegistryFilePath, screenRegistryTransformed);
}

function transformAddMenuItem(source: string, route: string): string {
  const menuItemJSX = createMenuItemJSX(route);

  const tsxParser = j.withParser('tsx');
  const appMenuAST = tsxParser(source);

  const menu = appMenuAST.findJSXElements('Menu');
  const [{value: {children}}] = menu.paths();
  children?.push(stringLiteral(menuItemJSX));

  return appMenuAST.toSource();
}

export function transformAddScreenImport(source: string, componentName: string, componentPath: string): string {
  const tsxParser = j.withParser('tsx');
  const ast = tsxParser(source);

  const existingSpecifiers = ast.find(j.ImportDeclaration)
    .find(j.ImportSpecifier)
    .filter(path => path.node.imported.name === componentName);
  const alreadyImported = existingSpecifiers.length > 0;

  if (alreadyImported) {
    return source;
  }

  const newImport = j.importDeclaration(
    [j.importDefaultSpecifier(j.identifier(componentName))],
    j.stringLiteral(componentPath)
  );

  ast.get().node.program.body.unshift(newImport);

  return ast.toSource();
}

export function transformAddScreenItem(
  source: string, route: string, caption: string, componentName: string
): string {

  const tsParser = j.withParser('ts');
  const screenRegistryAST = tsParser(source);

  const value = `{
    componentName: ${componentName},
    captionKey: '${caption}'    
  }`;

  screenRegistryAST
    .findVariableDeclarators('screenRegistry')
    .find(j.ObjectExpression)
    .at(0)
    .paths()
    [0]
    .value
    .properties
    .push(objectProperty(literal(route), literal(value)))

  return screenRegistryAST.toSource();
}


function createMenuItemJSX(key: string) {
  return `
    <Menu.Item
      title={getCaption('${key}')}
      key='${key}'
    >
      {getCaption('${key}')}
    </Menu.Item>
  `;
}
