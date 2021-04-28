const queries = require('../model/graphql/intIdentityIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "IntIdentityIdMgtTableEdit",
  "listComponentName": "IntIdentityIdMgtTableBrowse",
  "listType": "table",
  "entity": {
    "name": "scr_IntIdentityIdTestEntity"
  },
  "managementComponentName": "int-identity-id-mgt-table-management"
};