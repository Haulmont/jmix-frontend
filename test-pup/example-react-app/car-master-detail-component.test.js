const {login} = require("../common/login-to-scr");
const puppeteer = require("puppeteer");

describe('car master detail component', () => {

  let page;
  const url = 'carMasterDetail';

  beforeAll(async () => {
    page = await (await puppeteer.launch()).newPage();
    await login(page,'admin', 'admin');
  });

  it('should check that car table are loaded', async () => {
    await page.goto(`http://localhost:3000/${url}`);
    await page.waitFor('tr.ant-table-row');
    const carRows = await page.$$('tr.ant-table-row');
    expect(carRows.length).toEqual(10);

  });

  it('should check that car edit panel are rendered', async () => {
    await page.goto(`http://localhost:3000/${url}`);
    await page.waitFor('.ant-col-8 .ant-card .ant-card-body');
    const title = await page.$eval('.ant-col-8 .ant-card .ant-card-body', el => el.innerHTML);
    await expect(title).toMatch('Select an entity');
  });

  afterAll(async done => {
    page.browser().close();
    done();
  });

});
