import {
  getPalettePath,
  getAddonsPath,
  isAddonAlreadyImported,
  isPaletteAlreadyImported,
  createAddonPaletteJSX,
  injectAddonPalette,
  getPaletteAST,
  getAddonsAST,
  addAddonPalette,
  addAddonImport
} from "../../../../building-blocks/stages/writing/pieces/addons"
import path from "path";
import {expect} from "chai";
import jscodeshift from "jscodeshift";

const tsxParser = jscodeshift.withParser('tsx');

const testPaletteContents = `
  import {TestPalette} from "test-addon";
  import {Palette} from "palette";

  const CustomPalette = () => {
    return (
      <Palette>
        <TestPalette/>
      </Palette>
    )
  }
`;

const testAddonsContents = `
  import "test-addon";
  export {};
`;

const paletteAst = tsxParser(testPaletteContents);
const addonsAst = tsxParser(testAddonsContents);

const mockGen: any = {
  destinationRoot: () => "root",
  log: () => {console.log("mock log")}
}

describe("testing addon generator write-stage functions", () => {
  it("getPalettePath testing", () => {
    const pathToPalette = getPalettePath(mockGen, "dirshift");
    expect(pathToPalette).eq(path.join("root", "dirshift", 'dev', 'palette.tsx'));
  });

  it("getAddonsPath testing", () => {
    const pathToAddons = getAddonsPath(mockGen, "dirshift");
    expect(pathToAddons).eq(path.join("root", "dirshift", 'addons.ts'));
  });

  it("isAddonAlreadyImported testing", () => {
    expect(isAddonAlreadyImported(addonsAst, "test-addon")).eq(true);
    expect(isAddonAlreadyImported(addonsAst, "test-addo")).eq(false);
  });

  it("isPaletteAlreadyImported testing", () => {
    expect(isPaletteAlreadyImported(paletteAst, "TestPalette")).eq(true);
    expect(isPaletteAlreadyImported(paletteAst, "TestPalett")).eq(false);
  });

  it("createAddonPaletteJSX testing", () => {
    expect(createAddonPaletteJSX("PaletteComponent")).eq("<PaletteComponent/>");
  });

  it("injectAddonPalette testing", () => {
    const injectedExistingPaletteContent = injectAddonPalette(paletteAst.toSource(), "test-palette", "TestPalette");
    expect(injectedExistingPaletteContent).eq(paletteAst.toSource());

    const injectedNewPaletteContent = injectAddonPalette(paletteAst.toSource(), "test-palette2", "TestPalette2");
    const updatedPaletteAst = tsxParser(injectedNewPaletteContent);
    expect(injectedNewPaletteContent).eq(updatedPaletteAst.toSource());
  });

  it("injectAddonPalette testing", () => {
    const injectedExistingPaletteContent = injectAddonPalette(paletteAst.toSource(), "test-palette", "TestPalette");
    expect(injectedExistingPaletteContent).eq(paletteAst.toSource());

    const injectedNewPaletteContent = injectAddonPalette(paletteAst.toSource(), "test-palette2", "TestPalette2");
    const updatedPaletteAst = tsxParser(injectedNewPaletteContent);
    expect(injectedNewPaletteContent).eq(updatedPaletteAst.toSource());
  });

  it("getPaletteAST testing", () => {
    const modifiedGen = {
      ...mockGen,
      fs: {
        exists: () => false,
        read: () => testPaletteContents
      }
    }
    expect(getPaletteAST(modifiedGen, "dirShift")).eq(null);

    modifiedGen.fs.exists = () => true;
    const receivedPaletteAst = getPaletteAST(modifiedGen, "dirShift");
    expect(receivedPaletteAst!.toSource()).eq(paletteAst.toSource());
  });

  it("getAddonsAST testing", () => {
    const modifiedGen = {
      ...mockGen,
      fs: {
        exists: () => false,
        read: () => testAddonsContents
      }
    }
    expect(getAddonsAST(modifiedGen, "dirShift")).eq(null);

    modifiedGen.fs.exists = () => true;
    const receivedAddonseAst = getAddonsAST(modifiedGen, "dirShift");
    expect(receivedAddonseAst!.toSource()).eq(addonsAst.toSource());
  });

  it("addAddonPalette testing", () => {
    const modifiedGen = {
      ...mockGen,
      fs: {
        exists: () => false
      }
    }
    expect(addAddonPalette(modifiedGen, "dirShift", "PaletteComponent", "some-module")).eq(undefined);
  });

  it("addAddonImport testing", () => {
    const modifiedGen = {
      ...mockGen,
      fs: {
        exists: () => false
      }
    }
    expect(addAddonImport(modifiedGen, "dirShift", "some-module")).eq(undefined);
  });

});
