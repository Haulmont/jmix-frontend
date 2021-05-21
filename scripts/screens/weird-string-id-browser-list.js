const weirdStringIdEntityQuery = require('../model/graphql/weirdStringIdEntity');

module.exports = {
  "query": weirdStringIdEntityQuery,
  "componentName": "WeirdStringIdBrowserList",
  "browserType": "list",
  "entity": {
    "name": "scr_WeirdStringIdTestEntity"
  },
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
};