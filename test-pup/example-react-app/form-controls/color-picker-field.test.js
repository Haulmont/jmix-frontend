const puppeteer = require("puppeteer");
const {login} = require("../../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {getSubmitResult} = require("../../common/custom-form-controls");
const {findByLabelText} = queries;

describe('ColorPickerField form control', () => {
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

    const $field = await findByLabelText($document, 'Color');
    expect($field != null);
  });
});