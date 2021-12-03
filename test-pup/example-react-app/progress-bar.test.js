const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");

describe('ProgressBar ', () => {
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

    it('ProgressBar should display percents', async () => {
        await page.goto(`http://localhost:3000/${url}`);

        await page.waitForSelector('.ant-progress-text')
        const $progress = await page.$eval(".ant-progress-text", e => e.textContent);

        expect($progress).toEqual('50%')
    });
});