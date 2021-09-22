import {YeomanGenerator} from "../../../../YeomanGenerator";
import path from "path";
import jscodeshift, {stringLiteral} from "jscodeshift";

export function addMvpAppMenu(gen: YeomanGenerator, dirShift: string, route: string) {
  const destRoot = gen.destinationRoot();
  const appMenuDir = path.join(destRoot, dirShift ? dirShift : '');
  const appMenuPath = path.join(appMenuDir, 'app', 'AppMenu.tsx');

  if (!gen.fs.exists(appMenuPath)) {
    gen.log('Unable to add component to menu: route registry not found');
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
