"use strict";

const assert = require("assert");
const {initApp, mockServer} = require('./common');
global.fetch = require('node-fetch');
const {Router} = require('express');

beforeAll(async () => {
  await mockServer(Router()
    .get('/rest/permissions',
      (req, res) => res.status(401).send("Unauthorized")));
});

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
