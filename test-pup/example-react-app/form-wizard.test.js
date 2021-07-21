const {login} = require("../common/login-to-scr");
const puppeteer = require("puppeteer");

describe('form wizard component', () => {
  let page;
  const url = 'formWizardEditor';

  beforeAll(async () => {
    page = await (await puppeteer.launch()).newPage();
    await login(page);
  });

  it('should check that form wizard component renders step titles correctly', async () => {
    await page.goto(`http://localhost:3000/${url}`);
    
    await page.waitFor('div.ant-steps-item-title');
    const stepTitles = await page.$$eval(
      'div.ant-steps-item-title',
      elements => elements.map(el => el.innerText)
    );
    expect(stepTitles).toEqual([
      'Step0',
      'Step1',
      'Step2',
    ]);    
  });

  it('should check that form wizard component renders field labels correctly', async () => {
    await page.goto(`http://localhost:3000/${url}`);
    
    await page.waitFor('form.ant-form');
    const fieldLabelStepLabels = await page.$$eval(
      'form.ant-form',
      formElements => formElements.map(
        formEl => [...formEl.querySelectorAll('label')].map(el => el.innerText)
      )
    );

    expect(fieldLabelStepLabels).toEqual([
      ['Not null'],
      ['Date', 'Time', 'Integer'],
      ['Association O2O', 'Composition O2O'],
    ]);
  });
  
  afterAll(async done => {
    await page.browser().close();
    done();
  });

});
