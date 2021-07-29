"use strict";

const {initApp, mockServer, loginOpts} = require('./common');
const {Router} = require('express');
let backend;

global.fetch = require('node-fetch');

beforeAll(async () => {
  await mockServer(Router()
    .get('/rest/permissions',
      (req, res) => {
        const auth = req.header('Authorization')

        if (auth === 'Bearer -xMM4dlsCNjGtYviFArebBXep7w') {
          return res.send({
            entities: [
              {target: 'scr_Car:create', value: 1},
              {target: 'scr_Car:read', value: 1},
              {target: 'scr_Car:update', value: 1},
              {target: 'scr_Car:delete', value: 1}
            ],
            entityAttributes: [],
            specifics: [
              {target: 'rest.fileDownload.enabled', value: 1},
              {target: 'rest.fileUpload.enabled', value: 1}
              ]
          });
        }

        // user1
        if (auth === 'Bearer XONNmH89K2JKGu-To-oPNj1mk9o') {
          return res.send({
            entities: [
              {target: 'scr_Car:create', value: 1},
              {target: 'scr_Car:read', value: 1},
              {target: 'scr_Car:update', value: 1},
              {target: 'scr_Car:delete', value: 1}
            ],
            entityAttributes: [
              {target: 'scr_Car:manufacturer', value: 2},
              {target: 'scr_Car:carType', value: 2},
              {target: 'scr_Car:model', value: 2},
              {target: 'scr_Car:mileage', value: 1}
            ],
            specifics: [
              {target: 'rest.fileDownload.enabled', value: 0},
              {target: 'rest.fileUpload.enabled', value: 0}
            ]
          });
        }

        // user2
        if (auth === 'Bearer EY5etaIDPNMj3WF4T4CdTlCPm34') {
          return res.send({
            entities: [
              {target: 'scr_Car:create', value: 1},
              {target: 'scr_Car:read', value: 1},
              {target: 'scr_Car:update', value: 1},
              {target: 'scr_Car:delete', value: 1}
            ],
            entityAttributes: [
              {target: 'scr_Car:manufacturer', value: 2},
              {target: 'scr_Car:regNumber', value: 2},
              {target: 'scr_Car:carType', value: 2},
              {target: 'scr_Car:model', value: 2},
            ],
            specifics: []
          });
        }
        res.status(401).send("Unauthorized")
      })).then(result => backend = result);
});

afterAll(async () => await backend.server.close())

describe('JmixRestConnection security methods', () => {

  let app;

  it('should load effective perms for admin', async () => {
    app = initApp();
    await app.login('admin', 'admin', loginOpts);

    const perms = await app.getEffectivePermissions();
    const carEntityPerms = perms.entities.filter(item => item.target.startsWith('scr_Car:'));
    const carEntityAttrPerms = perms.entityAttributes.filter(item => item.target.startsWith('scr_Car:'));

    expect(Object.keys(perms).sort()).toEqual(['entities', 'entityAttributes', 'specifics'].sort());

    // admin should has access for all car operation
    expect(carEntityPerms.sort()).toEqual(
      [
        {target: 'scr_Car:create', value: 1},
        {target: 'scr_Car:read', value: 1},
        {target: 'scr_Car:update', value: 1},
        {target: 'scr_Car:delete', value: 1}
      ].sort()
    );

    // all car attrs should be allowed to modify for admin
    carEntityAttrPerms.forEach(item => expect(item.value === 2));

    // full access to work with files
    expect(perms.specifics.sort()).toEqual([{
      target: "rest.fileDownload.enabled",
      value: 1
    },
      {
        target: "rest.fileUpload.enabled",
        value: 1
      }]);
  });

  it('should load effective perms for user1', async () => {

    app = initApp();
    await app.login('user1', 'user1', loginOpts);
    const perms = await app.getEffectivePermissions();
    const carEntityPerms = perms.entities.filter(item => item.target.startsWith('scr_Car:'));
    const carEntityAttrPerms = perms.entityAttributes.filter(item => item.target.startsWith('scr_Car:'));

    expect(Object.keys(perms).sort()).toEqual(['entities', 'entityAttributes', 'specifics'].sort());

    // mechanic should has access for all car operation
    expect(carEntityPerms.sort()).toEqual(
      [
        {target: 'scr_Car:create', value: 1},
        {target: 'scr_Car:read', value: 1},
        {target: 'scr_Car:update', value: 1},
        {target: 'scr_Car:delete', value: 1}
      ].sort()
    );

    // allowed car attrs for mechanic
    expect(carEntityAttrPerms.sort()).toEqual(
      [
        {target: 'scr_Car:manufacturer', value: 2},
        {target: 'scr_Car:carType', value: 2},
        {target: 'scr_Car:model', value: 2},
        {target: 'scr_Car:mileage', value: 1}
      ].sort()
    );

    // no access to work with files
    expect(perms.specifics.sort()).toEqual([
      {target: "rest.fileDownload.enabled", value: 0},
      {target: "rest.fileUpload.enabled", value: 0}
    ]);
  });

  it('should load effective perms for user2', async () => {

    app = initApp();
    await app.login('user2', 'user2', loginOpts);
    const perms = await app.getEffectivePermissions();
    const carEntityPerms = perms.entities.filter(item => item.target.startsWith('scr_Car:'));
    const carEntityAttrPerms = perms.entityAttributes.filter(item => item.target.startsWith('scr_Car:'));

    expect(Object.keys(perms).sort()).toEqual(['entities', 'entityAttributes', 'specifics'].sort());

    // manager should has access for all car operation
    expect(carEntityPerms.sort()).toEqual(
      [
        {target: 'scr_Car:create', value: 1},
        {target: 'scr_Car:read', value: 1},
        {target: 'scr_Car:update', value: 1},
        {target: 'scr_Car:delete', value: 1}
      ].sort()
    );

    // allowed car attrs for manager
    expect(carEntityAttrPerms.sort()).toEqual(
      [
        {target: 'scr_Car:manufacturer', value: 2},
        {target: 'scr_Car:regNumber', value: 2},
        {target: 'scr_Car:carType', value: 2},
        {target: 'scr_Car:model', value: 2},
      ].sort()
    );

  });

});
