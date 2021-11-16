const puppeteer = require("puppeteer");
const { login } = require("../../common/login-to-scr");
const { getDocument, queries } = require("pptr-testing-library");
const { findByText } = queries;

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

  it("rich editor renders", async () => {
    await page.goto(`http://localhost:3000/${url}`);
    const $document = await getDocument(page);

    const $field = await findByText($document, "Model");
    expect($field != null);
  });
});
