const stringIdEntityQuery = require("../graphql/stringIdEntity");

module.exports = {
  "entity": {
    "name": "scr_StringIdTestEntity"
  },

  "editorComponentName": "StringIdMgtTableEdit",
  "editorQuery": stringIdEntityQuery,

  "browserComponentName": "StringIdMgtTableBrowse",
  "browserType": "table",
  "browserQuery": stringIdEntityQuery,

  'menuItem': 'ROOT'
}