"use strict";

const assert = require('assert');
global.fetch = require('node-fetch');
const {initApp, mockServer, loginOpts} = require('./common');
const {Router} = require('express');

let backend, app, newCar, updateCar;

beforeEach(() => {newCar = null; updateCar = null})

beforeAll(async () => {
  await mockServer(Router()
    .get('/rest/userInfo', (req, res) => res.send({}))
    .get('/rest/messages/entities', (req, res) => res.send({}))
    .get('/rest/entities/scr_User/60885987-1b61-4247-94c7-dff348347f93',
      (req, res) => res.send(
        {_instanceName: "not empty"}
        ))
    .post('/rest/entities/scr_Car', (req, res) => {
      newCar = req.body;
      newCar.id = '3fe34bbc-979a-44c1-a23a-8ad8a3d61c4b';
      return res.send(newCar);
    })
    .put('/rest/entities/scr_Car/3da61043-aaad-7e30-c7f5-c1f1328d3980', (req, res) => {
      updateCar = req.body
      return res.send(updateCar);
    })
    .get('/rest/entities/scr_Car/3fe34bbc-979a-44c1-a23a-8ad8a3d61c4b', (req, res) => {
      res.send(newCar)
    })
    .get('/rest/entities/scr_Car/3da61043-aaad-7e30-c7f5-c1f1328d3980', (req, res) => {
      res.send(updateCar)
    })
    .delete('/rest/entities/scr_Car/3fe34bbc-979a-44c1-a23a-8ad8a3d61c4b', (req, res) => {
      return res.send({});
    })
    .get('/rest/entities/scr_Car', (req, res) => {
      res.send([{_instanceName: 'not empty'}])
    })
    .get('/rest/entities/scr_User', (req, res) => {
      res.header('X-Total-Count', 3).send([{}, {}, {}])
    })
    .get('/rest/entities/scr_User/search', (req, res) => {
      if (req.query.filter.indexOf('"group":"OR"') > -1) {
        res.header('X-Total-Count', 2).send([{_instanceName: 'not empty'}, {_instanceName: 'not empty'}])
      }
      res.header('X-Total-Count', 1).send([{_instanceName: 'not empty'}])
    })


  ).then(result => backend = result);

  app = initApp();
  await app.login('admin', 'admin', loginOpts);
})

afterAll(async () => await backend.server.close())


describe('JmixRestConnection', () => {

  it('.loadEntitiesMessages()', () => app.loadEntitiesMessages());

  it('.getUserInfo()', () => app.getUserInfo());

  it('.loadEntity()', done => {
    app.loadEntity('scr_User', '60885987-1b61-4247-94c7-dff348347f93')
      .then((entity) => {
        assert(entity._instanceName != null);
        done();
      })
      .catch((e) => {
        done(e)
      });
  });

  it('should create and return new entity', () => {
    const car = {
      model: 'car-' + Math.random(),
      manufacturer: 'Manufacturer',
      carType: "SEDAN"
    };

    return app
      .commitEntity('scr_Car', car)
      .then(createdEntity => app.loadEntity('scr_Car', createdEntity.id))
      .then((entity) => {
        assert.strictEqual(entity.model, car.model);
        assert(entity.id != null);
      });
  });

  it('should update existing entity', async () => {
    const car = {
      id: '3da61043-aaad-7e30-c7f5-c1f1328d3980',
      model: '2122'
    };

    const fetchOptions = {
      commitMode: 'edit'
    }

    return app.commitEntity('scr_Car', car, fetchOptions)
      .then(() => app.loadEntity('scr_Car', car.id))
      .then((updatedCar) => assert(updatedCar.model === '2122'));
  });

  describe('.deleteEntity()', () => {
    it('should delete entity', done => {
      app.commitEntity('scr_Car', {manufacturer: "VAZ", carType: 'SEDAN'})
        .then(car => {
        app.deleteEntity('scr_Car', car.id)
          .then(() => {
            done();
          })
          .catch(e => {
            done(e);
          });
      })
    });

  });

  describe('.loadEntities()', () => {
    it('should load list of entities', done => {
      const options = {
        view: '_instance_name',
        limit: 1,
      };
      app.loadEntities('scr_Car', options)
        .then(cars => {
          assert.strictEqual(cars.length, 1);
          assert.ok(!cars[0].hasOwnProperty('price'));
          assert(cars[0]._instanceName != null);
          done();
        })
        .catch(e => {
          done(e);
        });
    });
  });

  describe('.loadEntitiesWithCount()', () => {
    it('should return entities and count', done => {
      app.loadEntitiesWithCount('scr_User')
        .then(resp => {
          assert(Array.isArray(resp.result), '.result is not array');
          assert(resp.result.length === 3, 'result array should contain 3 entities');
          assert(resp.count === 3, 'count should be 1');
          done();
        })
        .catch(e => {
          done(e)
        });
    })
  });

  const simpleFilter = {
    conditions: [{
      property: 'username',
      operator: 'contains',
      value: 'adm'
    }]
  };

  const groupConditionsFilter = {
    conditions: [{
      group: 'OR',
      conditions: [{
        property: 'username',
        operator: 'contains',
        value: 'adm'
      }, {
        property: 'username',
        operator: 'contains',
        value: 'mech'
      }]
    }]
  };

  describe('.searchEntities()', () => {
    it('should search entities by a simple condition', () => app.searchEntities('scr_User', simpleFilter));
    it('should search group conditions', () => app.searchEntities('scr_User', groupConditionsFilter))
  });

  describe('.searchEntitiesWithCount()', () => {
    it('should search entities by a simple condition', done => {
      app.searchEntitiesWithCount('scr_User', simpleFilter)
        .then(resp => {
          assert(Array.isArray(resp.result), '.result is not array');
          assert(resp.result.length === 1, 'result array should contain 1 entities, contains ' + resp.result.length);
          assert(resp.count === 1, 'count should be 1');
          assert(resp.result[0]._instanceName != null);
          done();
        })
        .catch(e => {
          done(e)
        });
    });
    it('should search group conditions', done => {
      app.searchEntitiesWithCount('scr_User', groupConditionsFilter)
        .then(resp => {
          assert(Array.isArray(resp.result), '.result is not array');
          assert(resp.result.length === 2, 'result array should contain 2 entities, contains ' + resp.result.length);
          assert(resp.count === 2, 'count should be 2');
          assert(resp.result[0]._instanceName != null);
          done();
        })
        .catch(e => {
          done(e)
        });
    })
  });

  // todo need to check that methods above are exist in new backend rest

  // describe('.setSessionLocale()', () => {
  //   it('should set session locale', () => app.setSessionLocale());
  // });

  // describe('.getApiVersion()', () => {
  //   it('should get API version', async () => {
  //     const version = await app.getApiVersion();
  //     assert(version);
  //     assert(version.length);
  //     assert(version.length > 0);
  //   });
  // });
  //
  // describe('.refreshApiVersion()', () => {
  //   it('should refresh API version', async () => {
  //     const version = await app.refreshApiVersion();
  //     assert.equal(version, app.apiVersion);
  //   })
  // });

});
