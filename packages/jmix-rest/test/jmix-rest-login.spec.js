"use strict";

global.fetch = require('node-fetch');
const {initApp, loginOpts} = require('./common');

describe('JmixRestConnection .login()', () => {
  it('shouldn\'t work with bad credentials', done => {
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
  it('should work with right credentials', () => {
    const newApp = initApp();
    return newApp.login('admin', 'admin', loginOpts);
  });
});

