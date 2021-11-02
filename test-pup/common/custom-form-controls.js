const {getDocument, queries} = require("pptr-testing-library");
const {findByRole} = queries;

exports.getSubmitResult = async (page) => {
  const $document = await getDocument(page);

  const $submit = await findByRole($document, 'button', {name: /submit/i});
  $submit.click();

  const $result = await findByRole($document, 'log');

  const displayedSubmitResult = await page.evaluate(el => el.innerHTML, $result);
  return JSON.parse(displayedSubmitResult);
};