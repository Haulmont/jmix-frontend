const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {findByText} = queries;

describe('Paging', () => {
    let page;
    let $document;
    let $pagingCard;
    const url = 'customControls';

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
        $document = await getDocument(page);
        $pagingCard = await (await findByText($document, "Paging"))
            .evaluateHandle(el => el.parentElement.parentElement.parentElement)
    })

    it('Render total number', async () => {
        const $totalItems = await findByText($pagingCard,"Total 100 items");
        expect($totalItems).not.toBeNull();
    });
});