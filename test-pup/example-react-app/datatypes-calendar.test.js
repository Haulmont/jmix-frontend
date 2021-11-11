const {login} = require("../common/login-to-scr");
const puppeteer = require("puppeteer");
const {queries, getDocument, waitFor} = require("pptr-testing-library");
const {antSelect} = require("../common/formHelpert");
const {getByTitle, getByText} = queries;

describe('Datatypes Calendar', () => {
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

  it('mouth select works correctly', async () => {
    await page.goto('http://localhost:3000/datatypesCalendar');

    await page.waitFor('.ant-picker-calendar-month-select')
    const $monthSelectParent = await page.$('.ant-picker-calendar-month-select');

    await antSelect({
      page,
      $selectParent: $monthSelectParent,
      value: 'Dec'
    });

    await waitFor(() => getByTitle($monthSelectParent, 'Dec'));
  });

  it('year select works correctly', async function() {
    await page.goto('http://localhost:3000/datatypesCalendar');

    await page.waitFor('.ant-picker-calendar-year-select')
    const $yearSelectParent = await page.$('.ant-picker-calendar-year-select');

    await antSelect({
      page,
      $selectParent: $yearSelectParent,
      value: '2019'
    });

    await waitFor(() => getByTitle($yearSelectParent, '2019'));
  });

  it('calendar show events correctly', async () => {
    await page.goto('http://localhost:3000/datatypesCalendar');
    const $document = await getDocument(page);

    await page.waitFor('.ant-picker-calendar-month-select')
    const $monthSelectParent = await page.$('.ant-picker-calendar-month-select');
    await antSelect({
      page,
      $selectParent: $monthSelectParent,
      value: 'Dec'
    });

    await page.waitFor('.ant-picker-calendar-year-select')
    const $yearSelectParent = await page.$('.ant-picker-calendar-year-select');
    await antSelect({
      page,
      $selectParent: $yearSelectParent,
      value: '2019'
    });

    await waitFor(() => getByText($document, 'Lorem Ipsum'));
  })
});
