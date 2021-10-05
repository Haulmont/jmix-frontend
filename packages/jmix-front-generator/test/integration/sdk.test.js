const {promisify} = require('util');
const path = require('path');
const rimraf = promisify(require('rimraf'));
const fs = require('fs');
const {runGenerator, cmd, assertContent, init, checkFormat} = require('./integration-common')('sdk', 'scr');

const appDir = 'test/integration/generated/sdk';
const fixturesDir = 'test/integration/fixtures/sdk';

describe('test:integration:sdk', () => {

  before(() => init());

  it('should generate sdk app', async function () {

    await rimraf(`${appDir}/*`);
    await runGenerator('all', appDir);

    console.log('integration:sdk: start files comparison with expect gauges');
    assertContent('enums/enums.ts', appDir);
    assertContent('entities/scr$Car.ts', appDir);
    assertContent('entities/scr$SparePart.ts', appDir);

    await checkFormat(appDir);

    console.log('\nintegration:sdk: prepare to compile sdk');
    fs.copyFileSync(path.join(fixturesDir, 'tsconfig.json'), path.join(appDir, 'tsconfig.json'));

    await cmd(`cd ${appDir} && npm init -y && npm install typescript @haulmont/jmix-rest`,
      `integration:sdk: prepare to compile sdk - install packages, path: ${fs.realpathSync(appDir)}`,
      `integration:sdk: compile packages - DONE`);

    await cmd(`cd ${appDir} && ./node_modules/.bin/tsc`,
      `integration:sdk: start compile sdk, path: ${fs.realpathSync(appDir)}`,
      `integration:sdk: compile sdk - DONE`);

    console.log('integration:sdk: sdk generation test - PASSED');

  });
});
