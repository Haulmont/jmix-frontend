const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");
const {getDocument, queries, fireEvent} = require("pptr-testing-library");
const {findByText} = queries;

describe('Tooltip ', () => {
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

    it('save entity changes snippet', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $modalBtn = await findByText($document, 'Save entity changes');
        await $modalBtn.click();
        const $resultText = await findByText($document, 'Result:')

        expect($resultText).toBeDefined()
    });

    it('open modal snippet', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $modalBtn = await findByText($document, 'Open modal');
        await $modalBtn.click();
        await page.waitForSelector('.ant-modal-content')
        const $modalTitle = await page.$eval(".ant-modal-title", e => e.textContent);

        expect($modalTitle).toEqual('Modal Title')
    })

    it('open screen snippet', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $modalBtn = await findByText($document, 'Open screen');
        await $modalBtn.click();
        await page.reload()

        expect(page.url()).toEqual('http://localhost:3000/exampleCustomScreen')
    })

    it('link snippet', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $modalBtn = await findByText($document, 'Open link');
        await $modalBtn.click();
        await page.reload()

        expect(page.url()).toEqual('http://localhost:3000/exampleCustomScreen')
    })

    it('cancel modal snippet', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $modalBtn = await findByText($document, 'Open modal');
        await $modalBtn.click();
        await page.waitForSelector('.ant-modal-content', {visible: true})
        const $cancelBtn = await findByText($document, 'Cancel');
        await $cancelBtn.click()
        expect(await page.$('.ant-modal-content')).toBeFalsy()
    });

    it('close modal snippet', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $modalBtn = await findByText($document, 'Open modal');
        await $modalBtn.click();
        await page.waitForSelector('.ant-modal-content')
        const $okBtn = await page.$('.ant-modal-close');
        await $okBtn.click();

        expect(await page.$('.ant-modal-content')).toBeFalsy()
    });

    it('show notification snippet', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $notificationBtn = await findByText($document, 'Show notification');
        await $notificationBtn.click();
        await page.waitForSelector('.ant-notification')
        const $notification = await page.$('.ant-notification')

        expect($notification).toBeTruthy()
    });

    it('notification snippet title and description', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $notificationBtn = await findByText($document, 'Show notification');
        await $notificationBtn.click();
        await page.waitForSelector('.ant-notification')
        const $notificationTitle = await page.$eval(".ant-notification-notice-message", e => e.textContent);
        const $notificationDescription = await page.$eval(".ant-notification-notice-description", e => e.textContent);

        expect($notificationTitle).toEqual('Notification title')
        expect($notificationDescription).toEqual('Notification description')
    });

    it('load list of entities snippet', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        await page.waitForSelector('.items-list')
        const $list = await page.$eval(".items-list", e => e.textContent);
        expect($list).toEqual('List of items loaded')
    });

    it('load one entity snippet', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        await page.waitForSelector('.one-item')
        const $list = await page.$eval(".one-item", e => e.textContent);
        expect($list).toEqual('One item loaded')
    });
});