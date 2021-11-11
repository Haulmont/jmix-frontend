const {queries, getDocument, waitFor, wait} = require("pptr-testing-library");
const {findByTitle, getByTitle} = queries;

const getSelectOptionListIdSelector = (selectId) => `#${selectId}_list`;

/**
 * Works correctly if select have less or equal 10 options. Otherwise need to scroll dropdown.
 * 
 * @param {Page} page
 * @param {string} value
 * @param {ElementHandle} $selectParent
 */
exports.antSelect = async ({
  page,
  $selectParent,
  value
}) => {
  const $document = await getDocument(page);

  const $select = await $selectParent.$('.ant-select-selection-search-input')
  const selectId = await $select.evaluate(e => e.id);
  await $select.click();

  // Wait until mount a needed select dropdown, wait until the dropdown remove .ant-slide-up class, after that, you can click on dropdown options
  await page.waitForSelector('.ant-select-dropdown:not(.ant-slide-up) ' + getSelectOptionListIdSelector(selectId));

  const $$dropdowns = await $document.$$('.ant-select-dropdown');

  for(let $dropdown of $$dropdowns) {
    const selectorOptions = await $dropdown.$(getSelectOptionListIdSelector(selectId));
    if (selectorOptions != null) {
      const $optionWithNeededValue = await findByTitle($dropdown, value);
      await $optionWithNeededValue.click();
    }
  }

  await waitFor(() => getByTitle($selectParent, value));
}