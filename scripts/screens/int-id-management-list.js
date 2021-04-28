const queries = require('../model/graphql/intIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "IntIdMgtListEdit",
  "listComponentName": "IntIdMgtListBrowse",
  "listType": "list",
  "entity": {
    "name": "scr_IntegerIdTestEntity"
  },
  "managementComponentName": "int-id-management-list"
};