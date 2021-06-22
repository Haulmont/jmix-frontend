const {login} = require("../common/login-to-scr");
const puppeteer = require("puppeteer");

describe('car cards grid component', () => {

  let page;
  const url = 'carCardsGrid';

  beforeAll(async () => {
    page = await (await puppeteer.launch()).newPage();
    await login(page);
  });

  it('should check that car cards are loaded', async () => {
    await page.goto(`http://localhost:3000/${url}`);
    await page.waitFor('div.ant-card');
    const carCards = await page.$$('div.ant-card');
    expect(carCards.length).toEqual(12);
  });

  afterAll(async done => {
    await page.browser().close();
    done();
  });

});
