const stringIdEntityQuery = require('../model/graphql/stringIdEntity');

module.exports = {
  "query": stringIdEntityQuery,
  "componentName": "StringIdBrowserList",
  "browserType": "list",
  "entity": {
    "name": "scr_StringIdTestEntity"
  },
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
  'menuItem': 'ROOT'
};