const {runCmdSync} = require("./common");
const rimraf = require('rimraf');

rimraf.sync('example-app');

runCmdSync('node generate-app.js', './scripts');
runCmdSync('node generate-owner-crud.js', './scripts');
runCmdSync('node generate-pet-crud.js', './scripts');
runCmdSync('node generate-read-only.js', './scripts');

runCmdSync('lerna run prepublishOnly');
runCmdSync(`lerna exec --scope '{@amplicode/react-core, @amplicode/react-antd}' "npm pack"`);

installLocalPackage('react-core');
installLocalPackage('react-antd');
runCmdSync('npm i --prefix example-app');

function installLocalPackage(packageName) {
  const {version} = require(`../packages/${packageName}/package.json`);
  runCmdSync(`npm i --prefix example-app packages/${packageName}/amplicode-${packageName}-${version}.tgz`);
}