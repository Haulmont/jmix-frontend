import {YeomanGenerator} from "../../../YeomanGenerator";
import path from "path";
import { convertToUnixPath } from "../../../../common/utils"
import { addComponentImport } from "../../../../generators/react-typescript/common/previews-registartion";
import { pushStringNodeToParentChildren } from '../../../../generators/react-typescript/common/menu'
import jscodeshift, {
  Collection,
  JSXElement, JSXAttribute
} from 'jscodeshift'

export function addToPalette(
  gen: YeomanGenerator,
  dirShift: string,
  componentFileName: string,
  isDefaultExport: boolean = true
) {
  const destRoot = gen.destinationRoot()
  const componentPaletteDir = path.join(destRoot, dirShift ? dirShift : '')
  const componentPalettePath = path.join(componentPaletteDir, 'dev', 'palette.tsx');
  const componentPath = `../${getRelativePath(componentPaletteDir, destRoot)}/${componentFileName}`;
  
  const { fs } = gen

  if (!fs.exists(componentPalettePath)) {
    return
  }

  const componentPaletteContents = fs.read(componentPalettePath);
  fs.write(
    componentPalettePath,
    addComponent(
      componentPaletteContents,
      { componentFileName, componentPath },
      isDefaultExport
    ));
}

export const addComponent = (
  componentPaletteContents: string, {
    componentFileName,
    componentPath
  }: { componentFileName: string, componentPath: string },
  isDefaultExport: boolean
) => {
  const tsxParser = jscodeshift.withParser('tsx');
  const paletteAST = tsxParser(componentPaletteContents);

  addComponentImport(paletteAST, isDefaultExport, componentFileName, componentPath);

  const newComponent = getNewComponentInPalette(componentFileName);
  return addComponentToPaletteComponent(paletteAST, newComponent);
}

function getNewComponentInPalette(
  componentClassName: string
) {
  return `
    <Component name="${componentClassName}">
      <Variant>
        <${componentClassName} />
      </Variant>
    </Component>
  `
}

function findScreensCategory(ast: Collection<any>) {
  return ast
    .findJSXElements("Category")
    .find(JSXAttribute, attr => attr.name.name === "name" && attr.value.value === 'Screens')
    .closest(JSXElement)
}

function addComponentToPaletteComponent(
  ast: Collection<any>,
  newComponent: string
): string {
  const palette = ast.findJSXElements("Palette");
  const existingCat = findScreensCategory(ast)

  if (!existingCat.length) {
    pushStringNodeToParentChildren(
      palette,
      `<Category name="Screens">${newComponent}</Category>`
    )

    return ast.toSource()
  }
  
  pushStringNodeToParentChildren(existingCat, newComponent)

  return ast.toSource()
}

function getRelativePath(routingDir: string, destRoot: string) {
  return convertToUnixPath(path.relative(routingDir, destRoot));
}