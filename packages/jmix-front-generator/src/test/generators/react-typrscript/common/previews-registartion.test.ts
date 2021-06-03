import { addComponent, getNewComponentPreview } from "../../../../generators/react-typescript/common/previews-registartion"
import { assert } from 'chai';

describe('previws generation', () => {
  const path = "testedPath";
  const componentName = 'TestedComponent';
  const componentPath = "./testedpath"

  it('test getNewMenuItem', () => {

    const expectedMenuItem = `
  <ComponentPreview path="${path}">
    <${componentName} />
  </ComponentPreview>`;

    assert.equal(getNewComponentPreview(path, componentName), expectedMenuItem);
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

    assert.equal(expectedPreviewsContent, actualPreviewsContent);
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

    assert.equal(expectedPreviewsContent, actualPreviewsContent);
  });
});