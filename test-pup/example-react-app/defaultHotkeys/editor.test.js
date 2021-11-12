const {login} = require("../../common/login-to-scr");
const puppeteer = require("puppeteer");
const {getDocument, queries, waitFor} = require("pptr-testing-library");
const {getByText, findByText} = queries;

describe('Default Editor Hotkeys', () => {
  let page;

  beforeAll(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    await login(page);
  });

  afterAll(async done => {
    page.browser().close();
    done();
  });

  it('open editor from table and save', async () => {
    await page.goto('http://localhost:3000/carBrowserTable');
    const $document = await getDocument(page);

    const $create = await findByText($document, 'Create');
    await $create.click();

    await waitFor(() => getByText($document, 'Submit'));
    
    await page.keyboard.press('KeyS');
    
    await waitFor(() => getByText($document, 'Validation Error. Please check the data you entered.'));
  });

  it('open editor from url and save', async () => {
    await page.goto('http://localhost:3000/carEditor');
    const $document = await getDocument(page);

    await waitFor(() => getByText($document, 'Submit'));
    
    await page.keyboard.press('KeyS');
    
    await waitFor(() => getByText($document, 'Validation Error. Please check the data you entered.'));
  });
});
