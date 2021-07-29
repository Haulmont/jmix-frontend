"use strict";

global.fetch = require('node-fetch');
const {initApp, mockServer, loginOpts} = require('./common');
let backend;

beforeAll(async () => await mockServer().then(result => backend = result));

afterAll(async () => await backend.server.close())

describe('JmixRestConnection .logout()', () => {

  const app = initApp();

  beforeEach(async () => {
    await app.login('admin', 'admin', loginOpts);
  });

  it('Logout dosent work with wrong endpoint from options', done => {
    app.logout({revokeEndpoint: "wrongEndpoint"})
      .then(() => {
        done('works with wrong endpoint from options');
      })
      .catch(() => {
        done();
      });
  });

  it('Logout works with right endpoint', async () => {
    await app.logout(loginOpts);
  });
});
