const {login} = require("../common/login-to-scr");
const puppeteer = require("puppeteer");

describe('data-tools addon', () => {

  let page;

  beforeAll(async () => {
    page = await (await puppeteer.launch()).newPage();
    await login(page,'admin', 'admin');
    await page.goto('http://localhost:3000/EntityInspector');
  });

  it('should check that data-tools addon are loaded', async () => {
    const notSelectedMsgXpath = `//div[@id='rc-tabs-0-panel-/EntityInspector__0']/div/div/div/span/div/div/div[2]`;

    await page.waitForXPath(notSelectedMsgXpath);
    let [notSelectedMsgElement] = await page.$x(notSelectedMsgXpath);
    let notSelectedMsg = await page.evaluate(
      notSelectedMsgElement => notSelectedMsgElement.textContent,
       notSelectedMsgElement
    );

    expect(notSelectedMsg).toEqual('No selected entity');
  });

  it('should check that entity-inspector table are loaded', async () => {
    await page.waitForSelector('#rc_select_0');
    await page.click('#rc_select_0');
    await page.waitFor(500);
    // select scr_Car entity
    await page.waitForSelector("[title='Car (scr_Car)'].ant-select-item");
    await page.click("[title='Car (scr_Car)'].ant-select-item");
    await page.waitForSelector(`.ant-select-dropdown-hidden`);

    await page.waitForSelector('.ant-table-tbody');
    const rows = await page.$$(`.ant-table-tbody tr.ant-table-row`);

    expect(rows.length).toEqual(10);
  });

  it('should check that entity-inspector editor are loaded', async () => {
    //click to first row in scr_Car table
    await page.click(`.ant-table-tbody tr.ant-table-row`);

    await page.waitForSelector('.ant-btn-default');
    //click to edit button
    await page.click('.ant-btn-default');

    await page.waitForSelector(".ant-breadcrumb");

    const breadcrumbTitles = await page.$$eval(".ant-breadcrumb > span", brdcrEls => brdcrEls.map(el => el.innerText));
    expect(breadcrumbTitles.length).toEqual(2);
    expect(['Entity Inspector>', 'scr_Car edit']).toEqual(expect.arrayContaining(breadcrumbTitles))
  });


  afterAll(async done => {
    page.browser().close();
    done();
  });

});
