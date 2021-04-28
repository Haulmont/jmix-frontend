const queries = require('../model/graphql/intIdentityIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "IntIdentityIdMgtListEdit",
  "listComponentName": "IntIdentityIdMgtListBrowse",
  "listType": "list",
  "entity": {
    "name": "scr_IntIdentityIdTestEntity"
  },
  "managementComponentName": "int-identity-id-mgt-list-management"
};