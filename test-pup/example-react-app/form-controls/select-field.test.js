const puppeteer = require("puppeteer");
const { login } = require("../../common/login-to-scr");
const { getDocument, queries } = require("pptr-testing-library");
const { getSubmitResult } = require("../../common/custom-form-controls");
const { findByLabelText, findByText } = queries;

describe("SelectField form control", () => {
  let page;
  const url = "customFormControls";

  beforeAll(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    await login(page);
  });

  afterAll(async done => {
    page.browser().close();
    done();
  });

  it("renders", async () => {
    await page.goto(`http://localhost:3000/${url}`);
    const $document = await getDocument(page);

    const $field = await findByLabelText($document, "Name");
    await $field.click();
    await page.waitForSelector(".ant-select-item-option-active");
    const $carType = await findByText($document, "Name 1");
    await $carType.click();

    const result = await getSubmitResult(page);
    expect(result.name != null);
  });
});
