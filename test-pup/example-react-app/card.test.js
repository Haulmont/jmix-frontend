const puppeteer = require("puppeteer");
const { login } = require("../common/login-to-scr");

describe("Card", () => {
  let page;
  const url = "customDataDisplayComponents";

  beforeAll(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    await login(page);
  });

  afterAll(async done => {
    page.browser().close();
    done();
  });

  it("should check that Card component is renders correctly", async () => {
    await page.goto(`http://localhost:3000/${url}`);
    await page.waitFor(".ant-card.custom-card");
    const title = await page.$eval(".ant-card.custom-card .ant-card-head-title", el => el.innerHTML);
    await expect(title).toMatch("Card title");
  });
});