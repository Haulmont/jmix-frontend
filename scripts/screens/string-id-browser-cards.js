const stringIdEntityQuery = require('../model/graphql/stringIdEntity');

module.exports = {
  "query": stringIdEntityQuery,
  "componentName": "StringIdBrowserCards",
  "browserType": "cards",
  "entity": {
    "name": "scr_StringIdTestEntity"
  },
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
  'menuItem': 'ROOT'
};