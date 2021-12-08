const {login} = require("../../common/login-to-scr");
const puppeteer = require("puppeteer");
const {getDocument, queries, waitFor} = require("pptr-testing-library");
const {getByText, findByText, findByLabelText} = queries;

describe('Default BrowserTable Hotkeys', () => {
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

  it('browser create hotkey', async () => {
    await page.goto('http://localhost:3000/carBrowserTable');
    const $document = await getDocument(page);

    await waitFor(() => getByText($document, 'Create'));
    await page.keyboard.down('KeyG');
    await page.keyboard.press('KeyC');
    await page.keyboard.up('KeyG');

    const $manufacturer = await findByLabelText($document, 'Manufacturer');
    expect(await $manufacturer.evaluate(node => node.value)).toEqual('');
  });

  it('browser edit hotkey', async () => {
    await page.goto('http://localhost:3000/carBrowserTable');
    const $document = await getDocument(page);

    await waitFor(() => getByText($document, 'Create'));
    const $tesla = await findByText($document, 'Tesla');
    await $tesla.click();
    await page.keyboard.down('KeyG');
    await page.keyboard.press('KeyE');
    await page.keyboard.up('KeyG');

    const $manufacturer = await findByLabelText($document, 'Manufacturer');
    expect(await $manufacturer.evaluate(node => node.value)).toEqual('Tesla');
  });

  it('browser delete hotkey', async () => {
    await page.goto('http://localhost:3000/carBrowserTable');
    const $document = await getDocument(page);

    await waitFor(() => getByText($document, 'Create'));
    const $tesla = await findByText($document, 'Tesla');
    await $tesla.click();
    await page.keyboard.press('KeyD');

    await waitFor(() => getByText($document, 'Are you sure you want to delete Tesla - Model Y?'));
  });
});
