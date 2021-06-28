const {login} = require("../common/login-to-scr");
const puppeteer = require("puppeteer");
const {checkPaging} = require("../common/paging");

describe('car cards grid paging', () => {

  let page;
  const url = 'carCardsGrid';
  const checkCarsPaging = checkPaging('div.ant-card');

  beforeAll(async () => {
    page = await (await puppeteer.launch()).newPage();
    await login(page);
  });

  it('should check pages count with page size > 10', async () => {
    await checkCarsPaging(page, `${url}?page=1&pageSize=20`, [null, ['Previous Page', '1', '2', 'Next Page']]);
  });

  it('should use only allowed page size url param', async () => {
    await checkCarsPaging(page, `${url}?page=5&pageSize=23`, [22, ['Previous Page', '1', 'Next Page']]);
    const activePageButtonTitle = await page
      .$eval('ul.ant-pagination li.ant-pagination-item-active', el => el.getAttribute('title'));
    expect(activePageButtonTitle).toEqual('1');
  });

  it('should check page button click', async () => {
    await page.goto(`http://localhost:3000/${url}`);
    await page.waitFor('.ant-pagination > .ant-pagination-item-2 > a');

    await page.click('.ant-pagination > .ant-pagination-item-2 > a');
    await page.waitFor('ul.ant-pagination li.ant-pagination-item-active');

    const activePageButtonTitle = await page
      .$eval('ul.ant-pagination li.ant-pagination-item-active', el => el.getAttribute('title'));

    expect(activePageButtonTitle).toEqual('2');
    expect(page.url()).toEqual(`http://localhost:3000/${url}?page=2&pageSize=12`);
  });

  afterAll(async done => {
    await page.browser().close();
    done();
  });

});
