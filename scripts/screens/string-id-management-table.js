const queries = require('../model/graphql/stringIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "StringIdMgtTableEdit",
  "editIdAttrPos": 1,
  "listComponentName": "StringIdMgtTableBrowse",
  "listType": "table",
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
  "entity": {
    "name": "scr_StringIdTestEntity"
  },
  "managementComponentName": "string-id-mgt-table-management"
};