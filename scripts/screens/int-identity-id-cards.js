const query = require('../model/graphql/intIdentityIdCards');

module.exports = {
  ...query,
  "entity": {
    "name": "scr_IntIdentityIdTestEntity"
  },
  "componentName": "IntIdentityIdCards",
}
