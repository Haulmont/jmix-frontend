"use strict";

global.fetch = require('node-fetch');
const {initApp, mockServer, loginOpts} = require('./common');
const {Router} = require('express');
const assert = require('assert');

let backend, app;

beforeAll(async () => {
  await mockServer(Router()
    .get('/rest/metadata/entities/scr_User/views', (req, res) => res.send([{}]))
    .get('/rest/metadata/entities/scr_User/views/_instance_name', (req, res) => res.send({}))
  ).then(result => backend = result);

  app = initApp();
  await app.login('admin', 'admin', loginOpts);
})

afterAll(async () => await backend.server.close())


describe('.loadEntityViews()', () => {
  it('should load entity views', async () => {
    const views = await app.loadEntityViews('scr_User');
    assert(Array.isArray(views));
  })

  it('should load particular view', async () => {
    const view = await app.loadEntityView('scr_User', '_instance_name');
    assert(typeof view === 'object');
  })
});
