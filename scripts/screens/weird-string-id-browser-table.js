const weirdStringIdEntityQuery = require('../model/graphql/weirdStringIdEntity');

module.exports = {
  "query": weirdStringIdEntityQuery,
  "componentName": "WeirdStringIdBrowserTable",
  "browserType": "table",
  "entity": {
    "name": "scr_WeirdStringIdTestEntity"
  },
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
};