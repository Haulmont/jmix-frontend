const puppeteer = require("puppeteer");
const { login } = require("../../common/login-to-scr");
const { getDocument, queries } = require("pptr-testing-library");
const { findByText } = queries;

describe("ImagePreview component", () => {
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

  it("add, open and delete image", async () => {
    await page.goto(`http://localhost:3000/${url}`);
    const $document = await getDocument(page);

    const fileName = "jmix_logo.png";

    await page.waitForSelector(".ant-upload-select");
    await page.click(".ant-upload-select");
    await page.waitForSelector("input[type=file]");
    const $field = await page.$("input[type=file]");
    await $field.uploadFile(fileName);
    await $field.evaluate(upload =>
      upload.dispatchEvent(new Event("change", { bubbles: true }))
    );

    await page.waitForSelector(".ant-upload-list-item-name");
    await page.click(".ant-upload-list-item-name");

    await page.waitForSelector(".ant-modal-root");
    const $close = await findByText($document, "Close");
    await $close.click();

    await page.waitForSelector(".ant-upload-list-item-card-actions-btn");
    await page.click(".ant-upload-list-item-card-actions-btn");
  });
});
