const puppeteer = require("puppeteer");
const {login} = require("../../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {findByLabelText} = queries;

describe('EntityPickerField form control', () => {
  let page;
  const url = 'customFormControls';

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

    const $typeENtityPickerfield = await findByLabelText($document, 'Type');
    expect($typeENtityPickerfield != null);

    const $regNumberENtityPickerfield = await findByLabelText($document, 'Model');
    expect($regNumberENtityPickerfield != null);
  });
});
