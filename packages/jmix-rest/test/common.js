const jmix = require('../dist-node/jmix.js');
const apiUrl = 'http://localhost:8080/rest/';

exports.initApp = function initApp(initApiVersion) {
  return new jmix.JmixRestConnection('', apiUrl, 'client', 'secret', undefined, undefined, initApiVersion);
};

exports.mockServer = async function mockServer(router) {
  return require('@haulmont/jmix-server-mock')
    .createServer('../../scripts/model/scr-jmix-schema.graphql', false, false)
    .then(({expressApp, apolloServer}) => {
      const port = 8080;
      const server = expressApp.listen({port});
      if (router != null) expressApp.use(router);
      console.log(`Mock server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
      return {server, apolloServer};
    })
}

exports.loginOpts = {
  tokenEndpoint: 'http://localhost:8080/oauth/token',
  revokeEndpoint: 'http://localhost:8080/oauth/revoke',
};

