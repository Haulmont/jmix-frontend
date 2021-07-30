const jmix = require('../dist-node/jmix.js');
const apiUrl = 'http://localhost:8080/rest/';

exports.initApp = function initApp(initApiVersion) {
  return new jmix.JmixRestConnection('', apiUrl, 'client', 'secret', undefined, undefined, initApiVersion);
};

exports.mockServer = async function mockServer(router) {
  await require('@haulmont/jmix-server-mock').createServer('../../scripts/model/scr-jmix-schema.graphql', false)
    .then(({expressApp, apolloServer}) => {
      const port = 8080;
      expressApp.listen({port});
      expressApp.use(router);
      console.log(`Mock server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    })
}
