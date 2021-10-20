import {YeomanGenerator} from "../../../../YeomanGenerator";
import jscodeshift, {
  identifier, 
  stringLiteral, 
  ImportDeclaration, 
  ImportSpecifier, 
  importDeclaration,
  importSpecifier,
  Collection,
} from "jscodeshift";
import path from "path";

export function addAddonPalette(
  gen: YeomanGenerator,
  dirShift: string,
  paletteComponentName: string,
  addonPackageName: string 
) {
  const destRoot = gen.destinationRoot();
  const srcDir = path.join(destRoot, dirShift ? dirShift : '');

  const appPalettePath = path.join(srcDir, 'dev', 'palette.tsx');
  if (!gen.fs.exists(appPalettePath)) {
    gen.log(`Unable to add addon's palette to app palette: app palette not found`);
    return;
  }

  const appPaletteContents = gen.fs.read(appPalettePath);

  const updatedAppPaletteContentns = injectAddonPalette(appPaletteContents, addonPackageName, paletteComponentName);
  gen.fs.write(appPalettePath, updatedAppPaletteContentns);

}

function injectAddonPalette(
  appPaletteContents: string,
  addonPackageName: string,
  paletteComponentName: string
) {
  const tsxParser = jscodeshift.withParser('tsx');
  const paletteAst = tsxParser(appPaletteContents);

  if (isPaletteAlreadyImported(paletteAst, paletteComponentName)) {
    return appPaletteContents;
  }

  injectPaletteImport(paletteAst, paletteComponentName, addonPackageName);
  injectPaletteComponent(paletteAst, paletteComponentName);

  return paletteAst.toSource();
}

function createAddonPaletteJSX(paletteComponentName: string) {
  return `<${paletteComponentName}/>`;
}

function isPaletteAlreadyImported(ast: Collection<any>, paletteComponentName: string): boolean {
  return ast.find(ImportDeclaration)
  .find(ImportSpecifier)
  .filter(path => path.node.imported.name === paletteComponentName)
  .length > 0;
}

function injectPaletteImport(ast: Collection<any>, paletteComponentName: string, addonPackageName: string) {
  const addonPaletteImport = importDeclaration(
    [importSpecifier(identifier(paletteComponentName))],
    stringLiteral(`${addonPackageName}/palette`)
  );

  ast.get().node.program.body.unshift(addonPaletteImport);
}

function injectPaletteComponent(ast: Collection<any>, paletteComponentName: string) {
  const paletteAddonJSX = createAddonPaletteJSX(paletteComponentName);

  const palette = ast.findJSXElements('Palette');
  const [{value: {children}}] = palette.paths();
  children?.push(stringLiteral(paletteAddonJSX));
}
