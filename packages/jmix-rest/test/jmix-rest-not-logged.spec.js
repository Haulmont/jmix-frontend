"use strict";

const assert = require("assert");
const {initApp} = require('./common');
global.fetch = require('node-fetch');

describe('Jmix not logged in', function() {
    it('.getEffectivePermissions() should fail if not logged in', function(done) {
      const app = initApp();
      app.getEffectivePermissions()
        .then(() => {
          assert(false);
        })
        .catch(e => {
          assert(e.message === 'Unauthorized')
          done();
        })
  });
});
