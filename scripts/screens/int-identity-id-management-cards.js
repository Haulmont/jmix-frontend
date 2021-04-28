const queries = require('../model/graphql/intIdentityIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "IntIdentityIdMgtCardsEdit",
  "listComponentName": "IntIdentityIdMgtCardsBrowse",
  "listType": "cards",
  "entity": {
    "name": "scr_IntIdentityIdTestEntity"
  },
  "managementComponentName": "int-identity-id-mgt-cards-management"
};