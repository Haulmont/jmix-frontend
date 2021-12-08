const puppeteer = require("puppeteer");
const { login } = require("../../common/login-to-scr");
const { getDocument, queries } = require("pptr-testing-library");
const { getSubmitResult } = require("../../common/custom-form-controls");

describe("RichTextEditor form control", () => {
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

    await page.waitForSelector(".ql-editor");
    let editor = await page.$(".ql-editor");
    await editor.click({ clickCount: 3 });

    await page.waitForSelector(".ql-underline");
    let underline = await page.$(".ql-underline");
    await underline.click();

    await editor.type("rich editor");

    const result = await getSubmitResult(page);
    expect(
      result.vanEntry
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .trim()
    ).toEqual("<p><strong><u>rich editor</u></strong></p>");
  });
});
