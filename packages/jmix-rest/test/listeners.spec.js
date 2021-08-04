"use strict";

global.fetch = require('node-fetch');
const {initApp} = require('./common');

describe('.onLocaleChange()', () => {
  const app = initApp();

  it('invokes a callback on locale change', done => {
    const callback = () => done();
    app.onLocaleChange(callback);
    app.locale = 'en';
  });
});
