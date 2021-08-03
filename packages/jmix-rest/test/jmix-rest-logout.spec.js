"use strict";

global.fetch = require('node-fetch');
const {initApp, loginOpts} = require('./common');

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
