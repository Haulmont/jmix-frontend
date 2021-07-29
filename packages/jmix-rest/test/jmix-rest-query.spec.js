"use strict";

global.fetch = require('node-fetch');
const {initApp, mockServer, loginOpts} = require('./common');
const {Router} = require('express');
const assert = require('assert');

let backend, app;

beforeAll(async () => {
  await mockServer(Router()
    .get('/rest/queries/scr_Car/allCars', (req, res) => res.send([{}]))
    .get('/rest/queries/scr_Car/carsByType',
      (req, res) => res.send([{carType: 'SEDAN'}]))
  ).then(result => backend = result);

  app = initApp();
  await app.login('admin', 'admin', loginOpts);
})

afterAll(async () => await backend.server.close())

describe('JmixRestConnection .query()', () => {

  it('should load query results', () => app
    .query('scr_Car', 'allCars')
    .then((cars) => assert(cars.length > 0)));

  it('should work with params', () => {
    return app
      .query('scr_Car', 'carsByType', {carType: 'SEDAN'})
      .then(cars => {
        assert(cars.length > 0);
        cars.forEach(c => assert(c.carType === 'SEDAN'))
      });
  })
});

