const query = require('../model/graphql/stringIdCards');

module.exports = {
  ...query,
  "entity": {
    "name": "scr_StringIdTestEntity"
  },
  "componentName": "StringIdCards"
}
