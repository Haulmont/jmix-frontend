const query = require('../model/graphql/carEntity');

module.exports = {
  'menuItem': 'ROOT',
  "componentName": "CarCardsWithDetails",
  "entity": {
    "name": "scr_Car"
  },
  query,
  "mainFields": [
    'model',
    "manufacturer",
    "carType",
  ],
};