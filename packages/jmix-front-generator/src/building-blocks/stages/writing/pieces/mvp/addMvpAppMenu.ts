import {YeomanGenerator} from "../../../../YeomanGenerator";
import path from "path";
import jscodeshift, {literal, objectProperty, stringLiteral} from "jscodeshift";

export function addMvpAppMenu(gen: YeomanGenerator, dirShift: string, route: string, caption: string, componentName: string) {
  const destRoot = gen.destinationRoot();
  const srcDir = path.join(destRoot, dirShift ? dirShift : '');

  addMenuItem(gen, srcDir, route);
  addToScreenRegistry(gen, srcDir, route, caption, componentName);
  // addImports();
}

function addMenuItem(gen: YeomanGenerator, srcDir: string, route: string) {
  const appMenuPath = path.join(srcDir, 'app', 'AppMenu.tsx');

  if (!gen.fs.exists(appMenuPath)) {
    gen.log('Unable to add component to menu: app menu not found');
    return;
  }

  const appMenuContents = gen.fs.read(appMenuPath);
  const menuItemJSX = createMenuItemJSX(route);

  const tsxParser = jscodeshift.withParser('tsx');
  const appMenuAST = tsxParser(appMenuContents);

  const menu = appMenuAST.findJSXElements('Menu');
  const [{value: {children}}] = menu.paths();
  children?.push(stringLiteral(menuItemJSX));

  const source = appMenuAST.toSource();

  gen.fs.write(appMenuPath, source);
}

function addToScreenRegistry(gen: YeomanGenerator, srcDir: string, route: string, caption: string, componentName: string) {
  // TODO move to separate function: adding screen to registry

  const screenRegistryFilePath = path.join(srcDir, 'app', 'screenRegistry.ts');

  if (!gen.fs.exists(screenRegistryFilePath)) {
    gen.log('Unable to add component to menu: screen registry not found');
    return;
  }

  const screenRegistryFileContent = gen.fs.read(screenRegistryFilePath);

  const newFileContent = addToScreenRegistryAST(screenRegistryFileContent, route, caption, componentName);

  gen.fs.write(screenRegistryFilePath, newFileContent);
}

export function addToScreenRegistryAST(
  screenRegistryFileContent: string, route: string, caption: string, componentName: string
): string {

  const tsParser = jscodeshift.withParser('ts');
  const screenRegistryAST = tsParser(screenRegistryFileContent);

  const value = `{
    componentName: ${componentName},
    captionKey: '${caption}'    
  }`;

  const x = screenRegistryAST
    .findVariableDeclarators('screenRegistry')
    .find(jscodeshift.ObjectExpression)
    .at(0)
    .paths()
    [0]
    .value;

  x.properties.push(objectProperty(literal(route), literal(value)))

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
