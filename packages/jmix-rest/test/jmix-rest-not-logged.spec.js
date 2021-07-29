"use strict";

const {initApp} = require('./common');
global.fetch = require('node-fetch');

describe('Jmix not logged in', function() {
    it('.setSessionLocale() should fail if not logged in', function(done) {
      const app = initApp();
      app.setSessionLocale()
        .then(() => {
          done('did not fail');
        })
        .catch(() => {
          done();
        })
  });
});
