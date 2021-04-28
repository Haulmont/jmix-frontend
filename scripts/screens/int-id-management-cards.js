const queries = require('../model/graphql/intIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "IntIdMgtCardsEdit",
  "listComponentName": "IntIdMgtCardsBrowse",
  "listType": "cards",
  "entity": {
    "name": "scr_IntegerIdTestEntity"
  },
  "managementComponentName": "int-id-management-cards"
};