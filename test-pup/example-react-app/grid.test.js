const puppeteer = require("puppeteer");
const { login } = require("../common/login-to-scr");

describe("Grid", () => {
  let page;
  let url = "customDataDisplayComponents";

  beforeAll(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    await login(page);
  });

  afterAll(async done => {
    page.browser().close();
    done();
  });

  it("should check that Row and Col components is renders correctly", async () => {
    await page.goto(`http://localhost:3000/${url}`);
    await page.waitFor(".ant-row .ant-col");
    const colText = await page.$eval(".ant-row .ant-col", el => el.innerHTML);
    await expect(colText).toMatch("col");
  });
});