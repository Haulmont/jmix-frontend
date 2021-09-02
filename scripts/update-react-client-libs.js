const updateClientLibs = require('./update-client-libs');
const rimraf = require("rimraf");
const path = require("path");

const clientDir = 'example-react-app';
rimraf.sync(path.join(clientDir,'package-lock.json'));
updateClientLibs(
    clientDir,
    ['rest', 'react-core', 'react-web', 'react-antd', 'front-generator']
);