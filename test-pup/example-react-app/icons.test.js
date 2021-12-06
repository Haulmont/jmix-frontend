const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");

describe('Icons ', () => {
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

    it('should render', async () => {
        await page.goto(`http://localhost:3000/${url}`);

        await page.waitForSelector('.anticon-plus-circle')
        const $plusIcon = await page.$('.anticon-plus-circle')

        const $checkIcon = await page.$('.anticon-check-circle')

        expect($plusIcon).toBeTruthy()
        expect($checkIcon).toBeTruthy()
    });
});