const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");

describe('DataTable ', () => {
    let page;
    const url = 'customDataDisplayComponents';

    beforeAll(async () => {
        const browser = await puppeteer.launch();
        page = await browser.newPage();
        await login(page);
    });

    afterAll(async done => {
        page.browser().close();
        done();
    });

    it('should select row and open filter options', async () => {
        await page.goto(`http://localhost:3000/${url}`);

        await page.waitForSelector('.ant-radio-input')
        await page.click('.ant-radio-input')

        await page.waitForSelector('.ant-table-row-level-0.ant-table-row-selected')
        const $selectedRow = await page.$(".ant-table-row-level-0.ant-table-row-selected");

        expect($selectedRow).toBeTruthy()

        await page.waitForSelector('.ant-table-filter-trigger')
        await page.click('.ant-table-filter-trigger')

        await page.waitForSelector('.ant-table-filter-dropdown')
        const $filter = page.$('.ant-table-filter-dropdown')

        expect($filter).toBeTruthy()




    });
});