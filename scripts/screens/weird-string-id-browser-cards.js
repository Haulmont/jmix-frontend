const weirdStringIdEntityQuery = require('../model/graphql/weirdStringIdEntity');

module.exports = {
  "query": weirdStringIdEntityQuery,
  "componentName": "WeirdStringIdBrowserCards",
  "browserType": "cards",
  "entity": {
    "name": "scr_WeirdStringIdTestEntity"
  },
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
  'menuItem': 'ROOT'
};