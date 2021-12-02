const puppeteer = require("puppeteer");
const { login } = require("../../common/login-to-scr");
const { getDocument, queries } = require("pptr-testing-library");
const { getSubmitResult } = require("../../common/custom-form-controls");
const { findByLabelText, findByText } = queries;

describe("DropdownField form control", () => {
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

  it("should allow selected value", async () => {
    await page.goto(`http://localhost:3000/${url}`);
    const $document = await getDocument(page);

    const $field = await findByLabelText($document, "Address");
    await $field.click();
    await page.waitForSelector("#address_list_0");
    const $address = await findByText($document, "Address 1");
    await $address.click();

    const result = await getSubmitResult(page);
    expect(result.address).toEqual("address1");
  });
});
