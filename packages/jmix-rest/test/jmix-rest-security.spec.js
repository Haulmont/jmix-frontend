"use strict";

const {initApp} = require('./common');

global.fetch = require('node-fetch');

describe('JmixRestConnection security methods', () => {

  let app;
  const loginOpts = {tokenEndpoint: 'http://localhost:8080/oauth/token'};

  it('should load effective perms for admin', async () => {
    app = initApp();
    await app.login('admin', 'admin', loginOpts);

    const perms = await app.getEffectivePermissions();
    const carEntityPerms = perms.entities.filter(item => item.target.startsWith('scr$Car:'));
    const carEntityAttrPerms = perms.entityAttributes.filter(item => item.target.startsWith('scr$Car:'));

    expect(Object.keys(perms).sort()).toEqual(['entities', 'entityAttributes'].sort());

    // admin should has access for all car operation
    expect(carEntityPerms.sort()).toEqual(
      [
        {target: 'scr$Car:create', value: 1},
        {target: 'scr$Car:read', value: 1},
        {target: 'scr$Car:update', value: 1},
        {target: 'scr$Car:delete', value: 1}
      ].sort()
    );

    // all car attrs should be allowed to modify for admin
    carEntityAttrPerms.forEach(item => expect(item.value === 2));
  });

  it('should load effective perms for mechanic', async () => {

    app = initApp();
    await app.login('mechanic', '1', loginOpts);
    const perms = await app.getEffectivePermissions();
    const carEntityPerms = perms.entities.filter(item => item.target.startsWith('scr$Car:'));
    const carEntityAttrPerms = perms.entityAttributes.filter(item => item.target.startsWith('scr$Car:'));

    expect(Object.keys(perms).sort()).toEqual(['entities', 'entityAttributes'].sort());

    // mechanic should has access for all car operation
    expect(carEntityPerms.sort()).toEqual(
      [
        {target: 'scr$Car:create', value: 1},
        {target: 'scr$Car:read', value: 1},
        {target: 'scr$Car:update', value: 1},
        {target: 'scr$Car:delete', value: 1}
      ].sort()
    );

    // allowed car attrs for mechanic
    expect(carEntityAttrPerms.sort()).toEqual(
      [
        {target: 'scr$Car:manufacturer', value: 2},
        {target: 'scr$Car:carType', value: 2},
        {target: 'scr$Car:model', value: 2},
        {target: 'scr$Car:mileage', value: 1}
      ].sort()
    );
  });

  it('should load effective perms for manager', async () => {

    app = initApp();
    await app.login('manager', '2', loginOpts);
    const perms = await app.getEffectivePermissions();
    const carEntityPerms = perms.entities.filter(item => item.target.startsWith('scr$Car:'));
    const carEntityAttrPerms = perms.entityAttributes.filter(item => item.target.startsWith('scr$Car:'));

    expect(Object.keys(perms).sort()).toEqual(['entities', 'entityAttributes'].sort());

    // manager should has access for all car operation
    expect(carEntityPerms.sort()).toEqual(
      [
        {target: 'scr$Car:create', value: 1},
        {target: 'scr$Car:read', value: 1},
        {target: 'scr$Car:update', value: 1},
        {target: 'scr$Car:delete', value: 1}
      ].sort()
    );

    // allowed car attrs for manager
    expect(carEntityAttrPerms.sort()).toEqual(
      [
        {target: 'scr$Car:manufacturer', value: 2},
        {target: 'scr$Car:regNumber', value: 2},
        {target: 'scr$Car:carType', value: 2},
        {target: 'scr$Car:model', value: 2},
      ].sort()
    );

  });

});
