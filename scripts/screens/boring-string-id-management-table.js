const boringStringIdEntityQueries = require('../model/graphql/boringStringIdEntity');

module.exports = {
  ...boringStringIdEntityQueries,
  "editComponentName": "BoringStringIdMgtTableEdit",
  "editIdAttrPos": 1,
  "listComponentName": "BoringStringIdMgtTableBrowse",
  "listType": "table",
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
  "entity": {
    "name": "scr_BoringStringIdTestEntity"
  },
  "managementComponentName": "boring-string-id-management-table"
};
