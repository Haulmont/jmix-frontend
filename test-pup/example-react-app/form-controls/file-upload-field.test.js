const puppeteer = require("puppeteer");
const { login } = require("../../common/login-to-scr");
const { getSubmitResult } = require("../../common/custom-form-controls");

describe("FileUploadField form control", () => {
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

  it("adds selected file", async () => {
    await page.goto(`http://localhost:3000/${url}`);

    const fileName = "package.json";

    await page.waitForSelector("input[type=file]");
    const $field = await page.$("input[type=file]");
    await $field.uploadFile(fileName);
    await $field.evaluate(upload =>
      upload.dispatchEvent(new Event("change", { bubbles: true }))
    );

    const result = await getSubmitResult(page);
    expect(result.capacity != null);
  });
});
