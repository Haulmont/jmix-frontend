const {login} = require("../common/login-to-scr");
const puppeteer = require("puppeteer");

// todo add tests for non-admin users

describe('car master detail security', () => {

  let pageAdmin;
  const url = 'carMasterDetail';

  beforeAll(async () => {
    pageAdmin = await (await puppeteer.launch()).newPage();
  });

  it('should check that security shows all car fields on editor for admin', async () => {
    await login(pageAdmin);

    await pageAdmin.goto(`http://localhost:3000/${url}`);
    await pageAdmin.waitFor('tr.ant-table-row');
    await pageAdmin.click('tr.ant-table-row');
    await pageAdmin.waitFor('form.ant-form');

    const fieldLabels = await pageAdmin.$$eval('div.ant-col.ant-form-item-label',
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
    await pageAdmin.browser().close();
    done();
  });

});
