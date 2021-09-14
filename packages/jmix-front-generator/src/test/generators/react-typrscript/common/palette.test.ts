import { addComponent } from "../../../../building-blocks/stages/writing/pieces/palette";
import { assert } from "chai";

const componentName = 'TestedComponent';
const componentPath = "./testedpath"
const expectedFirst = `
import react from "react";
import ${componentName} from "${componentPath}";
<Palette>
<Category name="another"></Category>
<Category name="Screens">
<Component name="${componentName}">
<Variant>
<${componentName} />
</Variant>
</Component>
</Category>
</Palette>
`

const stripAll = (v: string) => v.replace((/ |\r\n|\n|\r/gm),"");

describe('adding to palette', () => {
    it('creates new category on first add puts component there', () => {
      const paletteContent = `
      import react from "react";
      <Palette>
        <Category name="another"></Category>
      </Palette>
      `
      const actualPreviewsContent = addComponent(paletteContent, {
        componentPath,
        componentFileName: componentName
      }, true);

      assert.equal(stripAll(expectedFirst), stripAll(actualPreviewsContent));
    })
    it('generating to correct category on second add', () => {
      const componentName2 = 'TestedComponent2';
      const componentPath2 = "./tested2path"
      const expected = `
      import react from "react";
      import ${componentName2} from "${componentPath2}";
      import ${componentName} from "${componentPath}";
      <Palette>
        <Category name="another"></Category>
        <Category name="Screens">
          <Component name="${componentName}">
            <Variant>
              <${componentName} />
            </Variant>
          </Component>
          <Component name="${componentName2}">
            <Variant>
              <${componentName2} />
            </Variant>
          </Component>
        </Category>
      </Palette>
      `

      const actualPreviewsContent = addComponent(expectedFirst, {
        componentPath: componentPath2,
        componentFileName: componentName2
      }, true);

      assert.equal(stripAll(expected), stripAll(actualPreviewsContent));
    })
})