const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {findByText} = queries;

describe('Label', () => {
    let page;
    const url = 'customDataDisplayComponents';

    beforeAll(async () => {
        const browser = await puppeteer.launch();
        page = await browser.newPage();
        await login(page);
    });

    afterAll(async done => {
        page.browser().close();
        done();
    });

    it('renders', async () => {
        await page.goto(`http://localhost:3000/${url}`);
        const $document = await getDocument(page);

        await findByText($document, 'Technical Certificate');
    });
});