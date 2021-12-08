const puppeteer = require("puppeteer");
const { login } = require("../common/login-to-scr");

describe("Tabs", () => {
  let page;

  beforeAll(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    await login(page);
  });

  afterAll(async done => {
    page.browser().close();
    done();
  });

  it("should check that MultiTabs component is renders correctly", async () => {
    await page.goto("http://localhost:3000");
    await page.waitFor(".ant-tabs-tab .ant-space-item");
    const title = await page.$eval(".ant-tabs-tab .ant-space-item", el => el.innerHTML);
    await expect(title).toMatch("Home");
  });
});