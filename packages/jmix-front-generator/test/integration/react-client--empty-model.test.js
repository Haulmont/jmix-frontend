const path = require('path');
const {promisify} = require('util');
const rimraf = promisify(require('rimraf'));
const {runGenerator, init, installAndBuild, checkFormat} = require('./integration-common')('react-typescript', 'empty-model');
const fs = require('fs');
const assert = require('assert');

const EMPTY_APP_DIR = 'test/integration/generated/react-client-empty';

describe('test:integration:react:empty-model', () => {

  before(() => init());

  it('should generate app for empty project model', async function () {
    await rimraf(`${EMPTY_APP_DIR}/*`);
    await runGenerator('app', EMPTY_APP_DIR,
      undefined, undefined, 'projectModel-empty.json');

    const srcCubaDir = path.join(EMPTY_APP_DIR, 'src/jmix');
    assert.ok(!fs.existsSync(`${srcCubaDir}/enums/enums.ts`));
    assert.ok(!fs.existsSync(`${srcCubaDir}/entities`));

    await checkFormat(EMPTY_APP_DIR);
    await installAndBuild('empty-model', EMPTY_APP_DIR);
  });
});
