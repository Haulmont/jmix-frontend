const queries = require('../model/graphql/stringIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "StringIdMgtCardsEdit",
  "editIdAttrPos": 1,
  "listComponentName": "StringIdMgtCardsBrowse",
  "listType": "cards",
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
  "entity": {
    "name": "scr_StringIdTestEntity"
  },
  "managementComponentName": "string-id-mgt-cards-management"
};