"use strict";

const assert = require('assert');
const jmix = require('../dist-node/jmix.js');
global.fetch = require('node-fetch');

const apiUrl = 'http://localhost:8080/app/rest/';


describe('jmix', function () {

  describe('.initializeApp()', function () {
    it('simple initialization', function () {
      const app = jmix.initializeApp();
      assert.strictEqual(typeof app, 'object');
      jmix.removeApp();
    });
    it('initialization with the same name fails', function (done) {
      try {
        jmix.initializeApp();
        jmix.initializeApp();
        done('initialized twice');
      } catch (e) {
        done()
      }
      jmix.removeApp();
    });
    it('initialization with same explicit name fails', function(done) {
      assert.throws(function() {
        jmix.initializeApp({name: 'app2'});
        jmix.initializeApp({name: 'app2'});
        done('initialized twice');
      }, Error);
      done();
    });
    it('initialization with explicit parameters', function(done) {
      const app = jmix.initializeApp({
        apiUrl: apiUrl,
        name: 'AppCreatedWithExplicitParams',
        restClientId: 'client',
        restClientSecret: 'secret',
        defaultLocale: 'en',
        storage: {
          clear: () => {
            done();
          }
        }
      });
      assert.strictEqual(typeof app, 'object');
      jmix.removeApp('AppCreatedWithExplicitParams');
    })
  });

  describe('.getApp()', function () {
    it('initialize and retrieve - default config', function () {
      let app = jmix.initializeApp();
      assert.strictEqual(app, jmix.getApp());
      jmix.removeApp();
    });
  });

  describe('.removeApp()', function() {
    it('throws when trying to get non-existent app', function (done) {
      assert.throws(function() {
        jmix.removeApp('Non-existent app name');
      }, Error);
      done();
    });
  });

  describe('.getBasicAuthHeaders()', function() {
    it('uses default locale if not passed explicitly', function() {
      const headers = jmix.getBasicAuthHeaders('client', 'secret');
      assert.equal(headers['Accept-Language'], 'en');
    });
  });
});
