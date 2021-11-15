const { runCmdSync } = require("./common");
const fs = require('fs');

if (!fs.existsSync('./example-app')) {
  throw new Error("example-app directory doesn't exist");
}
const reactCoreVersion = require(`../packages/react-core/package.json`).version;
runCmdSync(`npm i -D ../packages/react-core/amplicode-react-core-${reactCoreVersion}.tgz`, "./test-addon");
runCmdSync('npm i && npm run compile && npm pack', "./test-addon");
const version = require(`../test-addon/package.json`).version;
runCmdSync(`npm i ../test-addon/test-addon-${version}.tgz`, "./example-app");

const addonGeneratorCommand = `node ./packages/codegen/bin/amplicodegen.js react-typescript:addon `
+ ` --dest "./example-app"`
+ ` --addonPackageName "test-addon"`;

runCmdSync(addonGeneratorCommand);
