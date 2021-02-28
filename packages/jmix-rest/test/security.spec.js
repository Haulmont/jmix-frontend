const security = require('../dist-node/security');

/*
Example of perms object, returned by jmix-rest

    {
      "entities": [{"target": "scr$Car:create", "value": 1}, {
        "target": "scr$Car:read",
        "value": 1
      }, {"target": "scr$Car:update", "value": 1}, {"target": "scr$Car:delete", "value": 1}],
      "entityAttributes": [{"target": "scr$Car:manufacturer", "value": 2}, {
        "target": "scr$Car:carType",
        "value": 2
      }, {"target": "scr$Car:model", "value": 2}, {"target": "scr$Car:mileage", "value": 1}]
    }

 */

describe('security', () => {

  it('should return correct attribute permission', () => {

    expect(security.getAttributePermission('scr$Car', 'mileage', undefined))
      .toBe('DENY');

    const perms = {entities: [], entityAttributes: []};

    expect(security.getAttributePermission('scr$Car', 'mileage', perms))
      .toBe('DENY');

    perms.entityAttributes.push({"target": "scr$Car:mileage", "value": 1})

    expect(security.getAttributePermission('scr$Car', 'mileage', perms))
      .toBe('VIEW');

    perms.entityAttributes = [{"target": "scr$Car:mileage", "value": 2}];

    expect(security.getAttributePermission('scr$Car', 'mileage', perms))
      .toBe('MODIFY');

    perms.entityAttributes = [{"target": "scr$Car:mileage", "value": 0}];

    expect(security.getAttributePermission('scr$Car', 'mileage', perms))
      .toBe('DENY');
  });

  it('should define if operation allowed or not', function () {
    expect(security.isOperationAllowed('scr$Car', 'read', undefined))
      .toBe(false);

    const perms = {entities: [], entityAttributes: []};
    expect(security.isOperationAllowed('scr$Car', 'read', perms))
      .toBe(false);

    perms.entities.push({target: 'scr$Car:read', value: 0});
    expect(security.isOperationAllowed('scr$Car', 'read', perms))
      .toBe(false);

    perms.entities = [
      {target: 'scr$Car:read', value: 1},
      {target: 'scr$Car:create', value: 0},
      {target: 'scr$Car:update', value: 0},
      {target: 'scr$Car:delete', value: 0}
    ];
    expect(security.isOperationAllowed('scr$Car', 'read', perms))
      .toBe(true);

    expect(security.isOperationAllowed('scr$Car', 'create', perms))
      .toBe(false);

  });

});
