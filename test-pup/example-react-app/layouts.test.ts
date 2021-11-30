const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {findByText} = queries;

describe('Layouts', () => {
    let page;
    let $document
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

    beforeEach(async () => {
        await page.goto(`http://localhost:3000/${url}`);
        $document = await getDocument(page);
    });

    it('Main AppLayout renders 3 children', async () => {
        const $header = await findByText($document, 'Header');
        const appLayoutChildCount = await (await $header.evaluateHandle(el => el.parentElement.childElementCount)).jsonValue();

        expect(appLayoutChildCount).toBe(3);
    });

    it('renders Content', async () => {
        const $content = await findByText($document, 'Content');
        expect($content).not.toBeNull();
    });

    it('renders Header', async () => {
        const $header = await findByText($document, 'Header');
        expect($header).not.toBeNull();
    });

    it('renders Footer', async () => {
        const $footer = await findByText($document, 'Footer');
        expect($footer).not.toBeNull();
    });

    it('renders Sidebar', async () => {
        const $sidebar = await findByText($document, 'Sidebar');
        expect($sidebar).not.toBeNull();
    });
});