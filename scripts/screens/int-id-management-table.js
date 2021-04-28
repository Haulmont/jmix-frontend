const queries = require('../model/graphql/intIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "IntIdMgtTableEdit",
  "listComponentName": "IntIdMgtTableBrowse",
  "listType": "table",
  "entity": {
    "name": "scr_IntegerIdTestEntity"
  },
  "managementComponentName": "int-id-management-table"
};