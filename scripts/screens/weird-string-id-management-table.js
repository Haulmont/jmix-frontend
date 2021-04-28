const queries = require('../model/graphql/weirdStringIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "WeirdStringIdMgtTableEdit",
  "editIdAttrPos": 1,
  "listComponentName": "WeirdStringIdMgtTableBrowse",
  "listType": "table",
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
  "entity": {
    "name": "scr_WeirdStringIdTestEntity"
  },
  "managementComponentName": "weird-string-id-mgt-table-management"
};