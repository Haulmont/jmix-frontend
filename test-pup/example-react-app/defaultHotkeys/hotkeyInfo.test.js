const {login} = require("../../common/login-to-scr");
const puppeteer = require("puppeteer");
const {getDocument, queries, waitFor} = require("pptr-testing-library");
const {getByLabelText, findByText} = queries;

describe('Default HotkeyInfo hotkeys', () => {
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

  it('open Shortcuts modal window', async () => {
    await page.goto('http://localhost:3000/');
    const $document = await getDocument(page);
    
    await waitFor(() => getByLabelText($document, 'mac-command'));
    await page.keyboard.press('Slash');

    const $hotkeyIntoTitle = await findByText($document, 'Keyboard Shortcuts');
    const hotkeyIntoTitleText = await $hotkeyIntoTitle.evaluate((node) => node.innerText);
    expect(hotkeyIntoTitleText).toEqual('Keyboard Shortcuts');
  });
});
