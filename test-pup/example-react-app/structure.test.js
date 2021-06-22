const {login} = require("../common/login-to-scr");
const puppeteer = require("puppeteer");

describe('structure component', () => {

  let page;
  const url = 'structureComponent';

  beforeAll(async () => {
    page = await (await puppeteer.launch()).newPage();
    await login(page);
  });

  it('should check that cards in structure component is rendered correctly', async () => {
    await page.goto(`http://localhost:3000/${url}`);

    await page.waitFor('div.ant-row');
    const rows = await page.$$('div.ant-row');
    expect(rows.length).toEqual(1);

    await page.waitFor('div.ant-col');
    const cols = await page.$$('div.ant-col');
    expect(cols.length).toEqual(2);

    await page.waitFor('div.ant-card');
    const carCards = await page.$$('div.ant-card');
    expect(carCards.length).toEqual(2);
  });
  
  afterAll(async done => {
    await page.browser().close();
    done();
  });

});
