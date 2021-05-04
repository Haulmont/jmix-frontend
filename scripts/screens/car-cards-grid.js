const query = require('../model/graphql/carEntityCards');

module.exports = {
    ...query,
    "componentName": "CarCardsGrid",
    "entity": {
        "name": "scr$Car"
    },
    "cardsInRow": "3 columns"
};