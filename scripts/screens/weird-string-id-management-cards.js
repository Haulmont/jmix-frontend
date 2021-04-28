const queries = require('../model/graphql/weirdStringIdEntity');

module.exports = {
  ...queries,
  "editComponentName": "WeirdStringIdMgtCardsEdit",
  "editIdAttrPos": 1,
  "listComponentName": "WeirdStringIdMgtCardsBrowse",
  "listType": "cards",
  "listShowIdAttr": true,
  "listIdAttrPos": 2,
  "entity": {
    "name": "scr_WeirdStringIdTestEntity"
  },
  "managementComponentName": "weird-string-id-mgt-cards-management"
};