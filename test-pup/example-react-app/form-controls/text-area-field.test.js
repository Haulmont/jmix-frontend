const puppeteer = require("puppeteer");
const { login } = require("../../common/login-to-scr");
const { getDocument, queries } = require("pptr-testing-library");
const { getSubmitResult } = require("../../common/custom-form-controls");
const { findByLabelText } = queries;

describe("TextArea form control", () => {
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

  it("should allow entering text", async () => {
    await page.goto(`http://localhost:3000/${url}`);
    const $document = await getDocument(page);

    const $field = await findByLabelText($document, "Reg Number");
    // Select whole line of text
    await $field.click({ clickCount: 3 });
    await $field.type("Test Reg Number");

    const result = await getSubmitResult(page);
    expect(result.regNumber).toEqual("Test Reg Number");
  });
});
