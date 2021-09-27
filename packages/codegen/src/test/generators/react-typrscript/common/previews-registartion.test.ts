import { addComponent, getNewComponentPreview } from "../../../../generators/react-typescript/common/previews-registartion"
import { assert } from 'chai';
import {stripNewLines} from "../../../test-commons";

describe('previws generation', () => {
  const path = "testedPath";
  const componentName = 'TestedComponent';
  const componentPath = "./testedpath"

  it('test getNewMenuItem', () => {

    const expectedMenuItem = `
  <ComponentPreview path="${path}">
    <${componentName} />
  </ComponentPreview>`;

    assert.equal(stripNewLines(getNewComponentPreview(path, componentName)), stripNewLines(expectedMenuItem));
  });

  it('test addComponent with default import', () => {

    const previewsContent = `
    import react from "react";
      <Previews>
      </Previews>
    `

    const expectedPreviewsContent = `\r
    import react from "react";\r
    import ${componentName} from "${componentPath}";\r
    <Previews>\r
      <ComponentPreview path="${path}">\r
          <${componentName} />\r
        </ComponentPreview></Previews>\r
    `

    const actualPreviewsContent = addComponent(previewsContent, {
      pathPattern: path,
      componentClassName: componentName,
      componentPath,
      componentFileName: ""
    }, true);

    assert.equal(stripNewLines(expectedPreviewsContent), stripNewLines(actualPreviewsContent));
  });

  it('test addComponent with named import', () => {

    const previewsContent = `
    import react from "react";
      <Previews>
      </Previews>
    `

    const expectedPreviewsContent = `\r
    import react from "react";\r
    import { ${componentName} } from "${componentPath}";\r
    <Previews>\r
      <ComponentPreview path="${path}">\r
          <${componentName} />\r
        </ComponentPreview></Previews>\r
    `

    const actualPreviewsContent = addComponent(previewsContent, {
      pathPattern: path,
      componentClassName: componentName,
      componentPath,
      componentFileName: ""
    }, false);

    assert.equal(stripNewLines(expectedPreviewsContent), stripNewLines(actualPreviewsContent));
  });
});