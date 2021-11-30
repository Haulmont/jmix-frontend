const puppeteer = require("puppeteer");
const { login } = require("../../common/login-to-scr");
const { getDocument, queries } = require("pptr-testing-library");
const { getSubmitResult } = require("../../common/custom-form-controls");
const { findByLabelText } = queries;

describe("SourceCodeEditor form control", () => {
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

  it("should contain text", async () => {
    await page.goto(`http://localhost:3000/${url}`);
    await page.waitForSelector(".ace_string");
    const text = await page.$eval(".ace_string", e => e.textContent);
    expect(text).toContain("hello");

    const result = await getSubmitResult(page);
    expect(result.createdBy).toEqual("console.log('hello')");
  });
});
