const intIdEntityQuery = require('../model/graphql/intIdEntity');

module.exports = {
  "query": intIdEntityQuery,
  "componentName": "IntIdBrowserTable",
  "browserType": "table",
  "entity": {
    "name": "scr_IntegerIdTestEntity"
  },
  'menuItem': 'ROOT'
};