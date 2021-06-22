const {login} = require("../common/login-to-scr");
const puppeteer = require("puppeteer");

describe('blank screen component', () => {

  let page;
  const url = 'testBlankScreen';

  beforeAll(async () => {
    page = await (await puppeteer.launch()).newPage();
    await login(page);
  });

  it('should check that blank screen component is rendered correctly', async () => {
    await page.goto(`http://localhost:3000/${url}`);
    await page.waitFor('span > div');
    const title = await page.$eval('span > div', el => el.innerHTML);
    await expect(title).toMatch('TestBlankScreen');
  });
  
  afterAll(async done => {
    await page.browser().close();
    done();
  });

});
