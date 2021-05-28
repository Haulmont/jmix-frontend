const intIdEntityQuery = require('../model/graphql/intIdEntity');

module.exports = {
  "query": intIdEntityQuery,
  "componentName": "IntIdBrowserList",
  "browserType": "list",
  "entity": {
    "name": "scr_IntegerIdTestEntity"
  },
  'menuItem': 'ROOT'
};