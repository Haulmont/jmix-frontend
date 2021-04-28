const queries = require('../model/graphql/trickyIdEntity');

module.exports = {
  ...queries,
  "entity": {
    "name": "scr_TrickyIdTestEntity"
  },
  "managementComponentName": "TrickyIdMgr",
  "listType": "list",
  "listComponentName": "TrickyIdList",
  "editComponentName": "TrickyIdEdit"
};
