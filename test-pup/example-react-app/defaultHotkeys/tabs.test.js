const {login} = require("../../common/login-to-scr");
const puppeteer = require("puppeteer");
const {getDocument, queries, waitFor} = require("pptr-testing-library");
const {findAllByRole, findByRole} = queries;

describe('Defualt Tabs Hotkeys', () => {
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

  it('switch active tabs', async () => {
    await page.goto('http://localhost:3000/');
    const $document = await getDocument(page);

    const menuitems = await findAllByRole($document, 'menuitem');
    await menuitems[1].click();
    
    let $selectedTab = await findByRole($document, 'tab', {selected: true});
    expect(await $selectedTab.evaluate(e => e.innerText)).toEqual('Example Custom Screen');

    await page.keyboard.down('KeyG');
    await page.keyboard.press('KeyN');
    await page.keyboard.up('KeyG');
    $selectedTab = await findByRole($document, 'tab', {selected: true});
    expect(await $selectedTab.evaluate(e => e.innerText)).toEqual('Example Custom Screen');

    await page.keyboard.down('KeyG');
    await page.keyboard.press('KeyP');
    await page.keyboard.up('KeyG');
    $selectedTab = await findByRole($document, 'tab', {selected: true});
    expect(await $selectedTab.evaluate(e => e.innerText)).toEqual('Home');

    await page.keyboard.down('KeyG');
    await page.keyboard.press('KeyP');
    await page.keyboard.up('KeyG');
    $selectedTab = await findByRole($document, 'tab', {selected: true});
    expect(await $selectedTab.evaluate(e => e.innerText)).toEqual('Home');

    await page.keyboard.down('KeyG');
    await page.keyboard.press('KeyN');
    await page.keyboard.up('KeyG');
    $selectedTab = await findByRole($document, 'tab', {selected: true});
    expect(await $selectedTab.evaluate(e => e.innerText)).toEqual('Example Custom Screen');
  });
});
