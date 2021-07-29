"use strict";

const assert = require("assert");
const {initApp, mockServer} = require('./common');
global.fetch = require('node-fetch');
const {Router} = require('express');
let backend;

beforeAll(async () => {
  await mockServer(Router()
    .get('/rest/permissions',
      (req, res) => res.status(401).send("Unauthorized")))
    .then(result => backend = result);
});

afterAll(async () => await backend.server.close())

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
