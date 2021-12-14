const puppeteer = require("puppeteer");
const {login} = require("../common/login-to-scr");
const {getDocument, queries} = require("pptr-testing-library");
const {findByText, findByPlaceholderText, findByLabelText} = queries;

describe('EntityFilter', () => {
    let page;
    let $document
    const url = 'customEntityFilterTest';

    beforeAll(async () => {
        const browser = await puppeteer.launch();
        page = await browser.newPage();
        await login(page);
    });

    afterAll(async done => {
        page.browser().close();
        done();
    });

    beforeEach(async () => {
        await page.goto(`http://localhost:3000/${url}`);
        $document = await getDocument(page);
    });

    it('Apply filter reg number, expect to find one item with proper manufacturer', async () => {
        const $selectFilter = await findByText($document, "Select filter");
        await $selectFilter.click();
        await page.waitForSelector(".ant-select-dropdown:not(.ant-slide-up)");
        const $select = await page.$(".ant-select-dropdown");
        const $regNumberItem = await findByText($select, "Reg Number");
        await $regNumberItem.click();
        const $addFilterBtn = await findByText($document, "Add filter");
        await $addFilterBtn.click();
        const $filterInput = await findByPlaceholderText($document, "Enter filter value");
        await $filterInput.type("tt444");
        const $applyFilterBtn = await findByText($document, "Apply filter");
        await $applyFilterBtn.click();
        await page.waitForSelector(".ant-list .ant-spin", {hidden: true});

        const $listItems = await page.$(".ant-list-items");
        const listItemsCount = await page.evaluate(el => el.childElementCount, $listItems);
        expect(listItemsCount).toBe(1);

        const $manufacturerTitle = await findByText($listItems, "Manufacturer", {exact: false});
        const manufacturer = await page.evaluate(el => el.parentElement.innerText, $manufacturerTitle);
        expect(manufacturer).toContain("Tesla");
    });

});