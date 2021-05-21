const boringStringIdEntityQuery = require('../model/graphql/boringStringIdEntity');

module.exports = {
  "query": boringStringIdEntityQuery,
  "componentName": "BoringStringIdBrowserTable",
  "browserType": "table",
  "entity": {
    "name": "scr_BoringStringIdTestEntity"
  },
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
};
