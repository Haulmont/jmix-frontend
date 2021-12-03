const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {findByText} = queries;

describe('AppErrorBoundary', () => {
    let page;
    let $testsCard;
    const url = 'errorBoundaryTests';
    const errorBoundaryMessage = "Something went wrong. Please refresh the page and try again.";

    beforeAll(async () => {
        const browser = await puppeteer.launch();
        page = await browser.newPage();
        await login(page);
    });

    afterAll(async done => {
        page.browser().close();
        done();
    });

    beforeEach(async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        $testsCard = await (await findByText($document, "Test app level ErrorBoundary"))
            .evaluateHandle(el => el.parentElement.parentElement.parentElement);
    })

    it('should handle error caused by render undefined', async () => {
        const $testButton = await findByText($testsCard, "Render undefined");
        await $testButton.click();
        const $errorTextView = await findByText($testsCard, errorBoundaryMessage);
        expect($errorTextView).not.toBeNull();
    });

    it('should handle error caused by exceeded callstack', async () => {
        const $testButton = await findByText($testsCard, "Exceed callstack");
        await $testButton.click();
        const $errorTextView = await findByText($testsCard, errorBoundaryMessage);
        expect($errorTextView).not.toBeNull();
    });

    it('should handle error caused by iterate over undefined object', async () => {
        const $testButton = await findByText($testsCard, "Iterate over undefined object");
        await $testButton.click();
        const $errorTextView = await findByText($testsCard, errorBoundaryMessage);
        expect($errorTextView).not.toBeNull();
    });

    it('should handle error caused by render object', async () => {
        const $testButton = await findByText($testsCard, "Render object");
        await $testButton.click();
        const $errorTextView = await findByText($testsCard, errorBoundaryMessage);
        expect($errorTextView).not.toBeNull();
    });

    it('should handle error caused by thrown error in use effect hook', async () => {
        const $testButton = await findByText($testsCard, "Throw error inside use effect hook");
        await $testButton.click();
        const $errorTextView = await findByText($testsCard, errorBoundaryMessage);
        expect($errorTextView).not.toBeNull();
    });
});