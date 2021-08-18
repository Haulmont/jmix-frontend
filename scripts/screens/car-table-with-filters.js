const query = require('../model/graphql/carEntity');

module.exports = {
  'menuItem': 'ROOT',
  "componentName": "carTableWithFilters",
  "entity": {
    "name": "scr_Car"
  },
  query,
  "filterableFields": [
    'model',
    "manufacturer",
    "carType",
  ],
};