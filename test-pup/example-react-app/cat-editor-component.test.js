const { login } = require("../common/login-to-scr");
const puppeteer = require("puppeteer");

describe('car editor component', () => {

  let page;

  beforeAll(async () => {
    page = await (await puppeteer.launch()).newPage();
    await login(page, 'admin', 'admin');
  });

  it('should check that car editor fields are rendered', async () => {

    await page.goto('http://localhost:3000/carEditor');
    await page.waitFor('form.ant-form');

    const fieldLabels = await page.$$eval('div.ant-col.ant-form-item-label',
      elements => elements.map(el => el.innerText));

    expect(fieldLabels).toEqual([
      'Manufacturer',
      'Model',
      'Reg Number',
      'Purchase Date',
      'Manufacture date',
      'Wheel On Right',
      'Type',
      'Eco Rank',
      'Max Passengers',
      'Price',
      'Mileage',
      'Garage',
      'Technical Certificate'
    ]);
  });

  afterAll(async done => {
    await page.browser().close();
    done();
  });
});
