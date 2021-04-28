const queries = require('../model/graphql/weirdStringIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "WeirdStringIdMgtListEdit",
  "editIdAttrPos": 1,
  "listComponentName": "WeirdStringIdMgtListBrowse",
  "listType": "list",
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
  "entity": {
    "name": "scr_WeirdStringIdTestEntity"
  },
  "managementComponentName": "weird-string-id-mgt-list-management"
};