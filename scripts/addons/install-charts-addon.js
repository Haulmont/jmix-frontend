const {runCmdSync} = require('../common');

const {version} = require('../../packages/jmix-addon-charts/package.json');

runCmdSync(`npm i packages/jmix-addon-charts/haulmont-jmix-addon-charts-${version}.tgz ` +
  `--legacy-peer-deps ` +
  `--prefix example-react-app`);
runCmdSync('node packages/jmix-front-generator/bin/gen-jmix-front react-typescript:addon ' +
  '--dest example-react-app/src ' +
  '--addonPackageName @haulmont/jmix-addon-charts ' +
  '--model scripts/model/projectModel-scr-jmix.json');

// TODO Remove once https://github.com/Haulmont/jmix-frontend/issues/846 is fixed
runCmdSync('npm i draft-js draftjs-to-html html-to-draftjs react-draft-wysiwyg --prefix example-react-app');