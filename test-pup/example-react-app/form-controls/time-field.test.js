const puppeteer = require("puppeteer");
const {login} = require("../../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {getSubmitResult} = require("../../common/custom-form-controls");
const {findByLabelText, findByText} = queries;
const dayjs = require('dayjs');

describe('TimeField form control', () => {
    let page;
    const url = 'customFormControls';

    beforeAll(async () => {
        const browser = await puppeteer.launch();
        page = await browser.newPage();
        await login(page);
    });

    afterAll(async done => {
        page.browser().close();
        done();
    });

    it('button "now" should select current time', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $field = await findByLabelText($document, 'From Time');
        $field.click()
        await page.waitForSelector(".ant-picker-dropdown:not(.ant-slide-up)")
        const $now = await findByText($document, "Now")
        $now.click()
        const currentTime = dayjs()
        await page.waitForSelector(".ant-picker-dropdown:not(.ant-slide-up)")

        const result = await getSubmitResult(page)
        expect(result.fromTime).toBeDefined()
        const selectedTime = dayjs(result.fromTime);
        expect(selectedTime.isSame(currentTime, "seconds")).toBeTruthy();
    });
});