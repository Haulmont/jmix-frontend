"use strict";

global.fetch = require('node-fetch');
const {initApp, mockServer, loginOpts} = require('./common');
let backend;

beforeAll(async () => await mockServer().then(result => backend = result));

afterAll(async () => await backend.server.close())

describe('JmixRestConnection .login()', () => {
  it('should not work with bad credentials', done => {
    const newApp = initApp();
    newApp.login('admin', 'admin2', loginOpts)
      .then(() => {
        done('works with bad credentials');
      })
      .catch(() => {
        done()
      });
  });

  it('should not work with empty credentials', done => {
    const newApp = initApp();
    newApp.login(null, null, loginOpts)
      .then(() => {
        done('works with empty credentials');
      })
      .catch(() => {
        done();
      });
  });
  it('should work with valid credentials', () => {
    const newApp = initApp();
    return newApp.login('admin', 'admin', loginOpts);
  });
});

