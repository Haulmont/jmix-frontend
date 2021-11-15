const puppeteer = require("puppeteer");
const { login } = require("../../common/login-to-scr");
const { getDocument, queries } = require("pptr-testing-library");
const { getSubmitResult } = require("../../common/custom-form-controls");
const { findByLabelText } = queries;

describe("MaskedField form control", () => {
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

    const $field = await findByLabelText($document, "Technical Certificate");
    // Select whole line of text
    await $field.click({ clickCount: 3 });
    await $field.type("11111111111111111111111111111111");

    const result = await getSubmitResult(page);
    expect(result.technicalCertificate).toEqual(
      "11111111-1111-1111-1111-111111111111"
    );
  });
});
