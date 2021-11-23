const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {findByText} = queries;

describe('EntityHierarchyTree ', () => {
    let page;
    const url = 'CustomDataDisplayComponents';

    beforeAll(async () => {
        const browser = await puppeteer.launch();
        page = await browser.newPage();
        await login(page);
    });

    afterAll(async done => {
        page.browser().close();
        done();
    });

    it('tree should expand nodes', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $nodeA = await findByText($document, 'Node A');
        const $treeSwitcher = await $nodeA.evaluateHandle(element => element?.parentElement?.previousElementSibling);
        await $treeSwitcher.click()
        // expected to be found
        await findByText($document, 'Node A1')
    });
});