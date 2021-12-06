const puppeteer = require("puppeteer");
const {login} = require("../../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {getSubmitResult} = require("../../common/custom-form-controls");
const {findByText} = queries;

describe('Button', () => {
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

    it('should show form values on submit', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $field = await findByText($document, 'Submit');
        await $field.click();

        await page.waitForSelector('pre[role=log]')
        const $text = await findByText($document, 'Result:');

        expect($text).toBeTruthy()
    });
});