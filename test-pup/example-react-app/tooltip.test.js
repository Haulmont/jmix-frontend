const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");

describe('Tooltip ', () => {
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

    it('button should display tooltip on hover', async () => {
        await page.goto(`http://localhost:3000/${url}`);

        await page.waitForSelector('.ant-btn-link')
        await page.hover('.ant-btn-link')

        await page.waitForSelector('.ant-tooltip-inner')
        const $tooltipText = await page.$eval(".ant-tooltip-inner", e => e.textContent);

        expect($tooltipText).toEqual('Tooltip Title')
    });
});