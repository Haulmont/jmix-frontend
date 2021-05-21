const stringIdEntityQuery = require('../model/graphql/stringIdEntity');

module.exports = {
  "query": stringIdEntityQuery,
  "componentName": "StringIdBrowserTable",
  "browserType": "table",
  "entity": {
    "name": "scr_StringIdTestEntity"
  },
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
};