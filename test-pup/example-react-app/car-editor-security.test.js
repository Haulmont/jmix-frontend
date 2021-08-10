const {login} = require("../common/login-to-scr");
const puppeteer = require("puppeteer");

describe('car editor security', () => {

  let pageMech;
  let pageMan;
  let pageAdmin;

  const url = 'carBrowserList';

  beforeAll(async () => {
    pageAdmin = await (await puppeteer.launch()).newPage();
    pageMech = await (await puppeteer.launch()).newPage();
    pageMan = await (await puppeteer.launch()).newPage();
  });

  // todo at this moment editor screen doesn't work for non-admin users https://github.com/Haulmont/jmix-frontend/issues/423
  xit('should check that security shows only allowed car fields on editor for mechanic', async () => {

    await login(pageMech, 'mechanic', '1');

    await pageMech.goto(`http://localhost:3000/${url}`);
    await pageMech.waitFor('.ant-list-item:first-child .ant-list-item-action li:last-child svg');
    await pageMech.click('.ant-list-item:first-child .ant-list-item-action li:last-child svg');
    await pageMech.waitFor('form.ant-form');

    const fieldLabels = await pageMech.$$eval('div.ant-col.ant-form-item-label',
      elements => elements.map(el => el.innerText));

    expect(fieldLabels).toEqual(['Manufacturer', 'Model', 'Type', 'Mileage']);

    // Mileage input exists and it's disabled
    const disabledMileageInput = await pageMech.$$('input#mileage[disabled]');
    expect(disabledMileageInput.length).toEqual(1);
  });


  // todo at this moment editor screen doesn't work for non-admin users https://github.com/Haulmont/jmix-frontend/issues/423
  xit('should check that security shows only allowed car fields on editor for manager', async () => {

    await login(pageMan, 'manager', '2');

    await pageMan.goto(`http://localhost:3000/${url}`);
    await pageMan.waitFor('ul.ant-list-items:first-child .ant-list-item-action:last-child');
    await pageMan.click('ul.ant-list-items:first-child .ant-list-item-action:last-child');
    await pageMan.waitFor('div.ant-col.ant-form-item-label');

    const fieldLabels = await pageMan.$$eval('div.ant-col.ant-form-item-label',
      elements => elements.map(el => el.innerText));

    expect(fieldLabels).toEqual(['Manufacturer', 'Model', 'Reg Number', 'Type']);
  });


  it('should check that security shows all car fields on editor for admin', async () => {
    await login(pageAdmin);

    await pageAdmin.goto(`http://localhost:3000/${url}`);
    await pageAdmin.waitFor('.ant-list-item:first-child .ant-list-item-action li:last-child svg');
    await pageAdmin.click('.ant-list-item:first-child .ant-list-item-action li:last-child svg');
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
    await pageMech.browser().close();
    await pageMan.browser().close();
    done();
  });

});
