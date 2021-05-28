const trickyIdEntityQuery = require('../model/graphql/trickyIdEntity');

module.exports = {
  "query": trickyIdEntityQuery,
  "browserType": "table",
  "componentName": "TrickyIdBrowserTable",
  "entity": {
    "name": "scr_TrickyIdTestEntity"
  },
  'menuItem': 'ROOT'
};
