const carEntityQuery = require("./graphql/carEntity");

module.exports = {
  "blankComponent": {
    "componentName": "BlankComponent"
  },
  "blankComponentLowCase": {
    "componentName": "blankComponent"
  },
  "structureComponent": {
    "componentName": "StructureComponent",
    "structureType": "Two columns"
  },
  "entityManagement": {
    "entity": {
      "name": "scr_Car"
    },

    "editorComponentName": "CarEdit",
    "editorQuery": carEntityQuery,

    "browserComponentName": "CarCards",
    "browserType": "cards",
    "browserQuery": carEntityQuery,

    'menuItem': 'ROOT'
  },
  "entityManagement2": {
    "entity": {
      "name": "scr_Car"
    },

    "editorComponentName": "CarEdit",
    "editorQuery": carEntityQuery,

    "browserComponentName": "CarList",
    "browserType": "list",
    "browserQuery": carEntityQuery,

    'menuItem': 'ROOT'
  },
  "entityManagement3": {
    "entity": {
      "name": "scr_Car"
    },

    "editorComponentName": "CarEdit",
    "editorQuery": carEntityQuery,

    "browserComponentName": "CarTable",
    "browserType": "table",
    "browserQuery": carEntityQuery,

    'menuItem': 'ROOT'
  },
  "entityManagementLowCase": {
    "entity": {
      "name": "scr_Car"
    },

    "editorComponentName": "carEditLowCase",
    "editorQuery": carEntityQuery,

    "browserComponentName": "carTableLowCase",
    "browserType": "table",
    "browserQuery": carEntityQuery,

    'menuItem': 'ROOT'
  },
  "entityCards": {
    "query": carEntityQuery,
    "componentName": "CarBrowserCards",
    "browserType": "cards",
    "entity": {
      "name": "scr_Car"
    },
    "menuItem": "ROOT"
  },
  "entityCardsGrid": {
    "query": carEntityQuery,
    "componentName": "CarCardsGrid",
    "entity": {
      "name": "scr_Car"
    },
    "cardsInRow": "3 columns",
    'menuItem': 'ROOT'
  },
  "queryResults": {
    "query": {
      "name": "carsByType",
      "entityName": "mpg$Car"
    },
    "componentName": "mpg-cars-by-type-list"
  },
  "serviceForm": {
    "componentName": "mpg-add-favorite-form",
    "serviceMethod": {
      "serviceName": "mpg_FavoriteService",
      "methodName": "addFavorite"
    }
  },
  "serviceData": {
    "componentName": "mpg-add-favorite-data",
    "serviceMethod": {
      "serviceName": "mpg_FavoriteService",
      "methodName": "addFavorite"
    }
  }
}
