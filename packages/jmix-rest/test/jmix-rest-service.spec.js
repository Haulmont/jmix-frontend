"use strict";

global.fetch = require('node-fetch');
const {initApp, mockServer, loginOpts} = require('./common');
const {Router} = require('express');
const assert = require('assert');

let backend, app;

beforeAll(async () => {
  await mockServer(Router()
    .post('/rest/services/scr_FavoriteService/refreshCache', (req, res) => res.send({}))
    .post('/rest/services/scr_FavoriteService/getFavoritesByType', (req, res) => res.send([{}, {}])))
    .then(result => backend = result);
  
  app = initApp();
  await app.login('admin', 'admin', loginOpts);
})

afterAll(async () => await backend.server.close())

describe('JmixRestConnection .invokeService()', () => {
  it('should invoke service without params and void result',
    () => app.invokeService('scr_FavoriteService', 'refreshCache'));

  it('should invoke service if null passed as params',
    () => app.invokeService('scr_FavoriteService', 'refreshCache', null))

  it('should invoke service with params',
    () => app.invokeService('scr_FavoriteService', 'getFavoritesByType', {carType: 'SEDAN'})
      .then(favCars => assert(favCars.length > 0)));
});
