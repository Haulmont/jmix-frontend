const puppeteer = require("puppeteer");
const {login} = require("../../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {findByLabelText} = queries;

describe('CheckboxField form control', () => {
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

    it('click changes checked state', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $field = await findByLabelText($document, 'Wheel On Right');
        await $field.evaluate(checkbox => checkbox.checked = false);

        await $field.click()
        expect(await (await $field.getProperty("checked")).jsonValue()).toBeTruthy();
        await $field.click()
        expect(await (await $field.getProperty("checked")).jsonValue()).toBeFalsy();
    });
});