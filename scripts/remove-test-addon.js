const { runCmdSync } = require("./common");
const fs = require('fs');

if (!fs.existsSync('./example-app')) {
  throw new Error("example-app directory doesn't exist");
}

runCmdSync(`npm uninstall test-addon`, "./example-app");

const removeAddonGeneratorCommand = `node ./packages/codegen/bin/amplicodegen.js react-typescript:remove-addon `
+ ` --dest "./example-app"`
+ ` --addonPackageName "test-addon"`;

runCmdSync(removeAddonGeneratorCommand);
