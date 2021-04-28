const queries = require('../model/graphql/stringIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "StringIdMgtListEdit",
  "editIdAttrPos": 1,
  "listComponentName": "StringIdMgtListBrowse",
  "listType": "list",
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
  "entity": {
    "name": "scr_StringIdTestEntity"
  },
  "managementComponentName": "string-id-mgt-list-management"
};