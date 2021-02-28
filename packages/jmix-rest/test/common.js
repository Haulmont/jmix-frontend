const jmix = require('../dist-node/jmix.js');
const apiUrl = 'http://localhost:8080/rest/';

exports.initApp = function initApp(initApiVersion) {
  return new jmix.JmixRestConnection('', apiUrl, 'client', 'secret', undefined, undefined, initApiVersion);
};
