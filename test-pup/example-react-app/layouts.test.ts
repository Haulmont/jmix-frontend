const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {findByText} = queries;

describe('Layouts', () => {
    let page;
    const url = 'customAppLayouts';

    beforeAll(async () => {
        const browser = await puppeteer.launch();
        page = await browser.newPage();
        await login(page);
    });

    afterAll(async done => {
        page.browser().close();
        done();
    });

    it('Main AppLayout renders 3 children', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        const $header = await findByText($document, 'Header');

        const appLayoutChildCount = await (await $header.evaluateHandle(el => el.parentElement.childElementCount)).jsonValue();
        expect(appLayoutChildCount).toBe(3);
    })

    it('renders Content, Header, Footer, Sider layouts', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        await findByText($document, 'Content');
        await findByText($document, 'Header');
        await findByText($document, 'Footer');
        await findByText($document, 'Sider');
    });
});