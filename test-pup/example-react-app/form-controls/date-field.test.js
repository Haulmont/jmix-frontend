const puppeteer = require("puppeteer");
const {login} = require("../../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {getSubmitResult} = require("../../common/custom-form-controls");
const {findByLabelText, findByText} = queries;
const dayjs = require('dayjs');

describe('DateField form control', () => {
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

    it('button "today" should select current day', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $field = await findByLabelText($document, 'From Date');
        $field.click();
        await page.waitForSelector(".ant-picker-dropdown:not(.ant-slide-up)");
        const $today = await findByText($document, "Today");
        $today.click();
        const currentDay = dayjs();
        await page.waitForSelector(".ant-picker-dropdown:not(.ant-slide-up)");

        const result = await getSubmitResult(page);
        expect(result.fromDate).toBeDefined();
        const selectedDate = dayjs(result.fromDate);
        expect(selectedDate.isSame(currentDay, "days")).toBeTruthy();
    });
});