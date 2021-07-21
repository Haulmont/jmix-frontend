const carEntityQuery = require('./graphql/carEntity');
const favoriteCarsCardsQuery = require('./graphql/favoriteCarsCards');;
const datatypesQuery = require('./graphql/datatypesTestEntity');
const datatypes2Queries = require('./graphql/datatypesTestEntity2');
const datatypes3Queries = require('./graphql/datatypesTestEntity3');
const associationM2MQuery = require('./graphql/associationM2M');
const associationM2OQuery = require('./graphql/associationM2O');
const associationO2MQuery = require('./graphql/associationO2M');
const associationO2OQuery = require('./graphql/associationO2O');
const compositionO2MQuery = require('./graphql/compositionO2M');
const compositionO2OQuery = require('./graphql/compositionO2O');

module.exports = {
  "app": {
    "menuType": "horizontal",
  },

  "blankComponent": {
    "componentName": "test-blank-screen",
    'menuItem': 'ROOT'
  },
  "exampleCustomScreen": {
    "componentName": "example-custom-screen",
    "menuItem": "ROOT"
  },
  "structure": {
    "componentName": "StructureComponent",
    "structureType": "Two columns",
    'menuItem': 'ROOT'
  },

  // Car Service Center domain entities
  "carEditor": {
    "query": carEntityQuery,
    "componentName": "CarEditor",
    "entity": {
      "name": "scr_Car"
    },
    'menuItem': 'ROOT'
  },
  "carBrowserCards": {
    "query": carEntityQuery,
    "componentName": "CarBrowserCards",
    "browserType": "cards",
    "entity": {
      "name": "scr_Car"
    },
    'menuItem': 'ROOT'
  },
  "carBrowserList": {
    "query": carEntityQuery,
    "componentName": "CarBrowserList",
    "browserType": "list",
    "entity": {
      "name": "scr_Car"
    },
    'menuItem': 'ROOT'
  },
  "carBrowserTable": {
    "query": carEntityQuery,
    "componentName": "CarBrowserTable",
    "browserType": "table",
    "entity": {
      "name": "scr_Car"
    },
    'menuItem': 'ROOT'
  },
  "carCardsGrid": {
    "query": carEntityQuery,
    "componentName": "CarCardsGrid",
    "entity": {
        "name": "scr_Car"
    },
    "cardsInRow": "3 columns",
    'menuItem': 'ROOT'
  },
  "favoriteCarsCards": {
    "query": favoriteCarsCardsQuery,
    "componentName": "FavoriteCars",
    "entity": {
      "name": "scr_FavoriteCar"
    },
    'menuItem': 'ROOT'
  },
  "carMasterDetail": {
    "entity": {
      "name": "scr_Car"
    },

    "masterDetailComponentName": "CarMasterDetail",

    "editorComponentName": "CarMasterDetailEditor",
    "editorQuery": carEntityQuery,

    "browserComponentName": "CarMasterDetailBrowser",
    "browserQuery": carEntityQuery,

    'menuItem': 'ROOT'
  },
  "carMultiSelectionTable": {
    "query": carEntityQuery,
    "componentName": "CarMultiSelectionTable",
    "entity": {
      "name": "scr_Car"
    },
    'menuItem': 'ROOT'
  },
  // "entityList": {
  //   "entityView": {
  //     "name": "_local",
  //     "entityName": "scr_Garage"
  //   },
  //   "componentName": "scr-garage-list",
  //   "entity": {
  //     "name": "scr_Garage"
  //   }
  // },

  // All datatypes
  "datatypesTestEditor": {
    "query": datatypesQuery,
    "componentName": "DatatypesTestEditor",
    "entity": {
      "name": "scr_DatatypesTestEntity"
    },
  },
  "datatypesTestBrowserCards": {
    "query": datatypesQuery,
    "componentName": "DatatypesTestBrowserCards",
    "browserType": "cards",
    "entity": {
      "name": "scr_DatatypesTestEntity"
    },
    "nestedEntityInfo": {
      "compositionO2Oattr": "compositionO2OTestEntity-view",
      "compositionO2Mattr": "compositionO2MTestEntity-view"
    },
    'menuItem': 'ROOT'
  },
  "datatypesTestBrowserList": {
    "query": datatypesQuery,
    "componentName": "DatatypesTestBrowserList",
    "browserType": "list",
    "entity": {
      "name": "scr_DatatypesTestEntity"
    },
    'menuItem': 'ROOT',
  },
  "datatypesTestBrowserTable": {
    "query": datatypesQuery,
    "componentName": "DatatypesTestBrowserTable",
    "browserType": "table",
    "entity": {
      "name": "scr_DatatypesTestEntity"
    },
    'menuItem': 'ROOT',
  },
  "datatypesTestCards": {
    "query": datatypesQuery,
    "componentName": "DatatypesTestCards",
    "entity": {
      "name": "scr_DatatypesTestEntity"
    },
    'menuItem': 'ROOT'
  },
  // TODO old version of answers for entity-management with nestedEntityInfo
  // "datatypes2Test": {
  //   ...datatypes2Queries,
  //   "editComponentName": "Datatypes2Edit",
  //   "listComponentName": "Datatypes2Browse",
  //   "listType": "table",
  //   "entity": {
  //     "name": "scr_DatatypesTestEntity2"
  //   },
  //   "managementComponentName": "Datatypes2Management",
  //   "nestedEntityInfo": {
  //     "datatypesTestEntityAttr": "datatypesTestEntity-view",
  //     "integerIdTestEntityAttr": "_local",
  //     "intIdentityIdTestEntityAttr": "_local",
  //     "stringIdTestEntityAttr": "_local",
  //     "weirdStringIdTestEntityAttr": "_local"
  //   }
  // },
  // "datatypes3Test": {
  //   ...datatypes3Queries,
  //   "editComponentName": "Datatypes3Edit",
  //   "listComponentName": "Datatypes3Browse",
  //   "listType": "table",
  //   "entity": {
  //     "name": "scr_DatatypesTestEntity3"
  //   },
  //   "managementComponentName": "Datatypes3Management",
  //   "nestedEntityInfo": {
  //     "datatypesTestEntityAttr": "datatypesTestEntity-view",
  //     "integerIdTestEntityAttr": "_local",
  //     "intIdentityIdTestEntityAttr": "_local",
  //     "stringIdTestEntityAttr": "_local",
  //     "weirdStringIdTestEntityAttr": "_local"
  //   }
  // },

  // Relations
  "associationO2OManagement": {
    "entity": {
      "name": "scr_AssociationO2OTestEntity"
    },

    "editorComponentName": "AssociationO2OEditor",
    "editorQuery": associationO2OQuery,

    "browserComponentName": "AssociationO2OBrowserTable",
    "browserType": "table",
    "browserQuery": associationO2OQuery,

    'menuItem': 'ROOT'
  },
  "associationO2MManagement": {
    "entity": {
      "name": "scr_AssociationO2MTestEntity"
    },

    "editorComponentName": "AssociationO2MEditor",
    "editorQuery": associationO2MQuery,

    "browserComponentName": "AssociationO2MBrowserTable",
    "browserType": "table",
    "browserQuery": associationO2MQuery,

    'menuItem': 'ROOT'
  },
  "associationM2OManagement": {
    "entity": {
      "name": "scr_AssociationM2OTestEntity"
    },

    "editorComponentName": "AssociationM2OEditor",
    "editorQuery": associationM2OQuery,

    "browserComponentName": "AssociationM2OBrowserTable",
    "browserType": "table",
    "browserQuery": associationM2OQuery,

    'menuItem': 'ROOT'
  },
  "associationM2MManagement": {
    "entity": {
      "name": "scr_AssociationM2MTestEntity"
    },

    "editorComponentName": "AssociationM2MEditor",
    "editorQuery": associationM2MQuery,

    "browserComponentName": "AssociationM2MBrowserTable",
    "browserType": "table",
    "browserQuery": associationM2MQuery,

    'menuItem': 'ROOT'
  },

  "compositionO2OManagement": {
    "entity": {
      "name": "scr_CompositionO2OTestEntity"
    },

    "editorComponentName": "CompositionO2OEditor",
    "editorQuery": compositionO2OQuery,

    "browserComponentName": "CompositionO2OBrowserTable",
    "browserType": "table",
    "browserQuery": compositionO2OQuery,

    "nestedEntityInfo": {
      "nestedComposition": "deeplyNestedTestEntity-view"
    },
    'menuItem': 'ROOT'
  },
  "compositionO2MManagement": {
    "entity": {
      "name": "scr_CompositionO2MTestEntity"
    },

    "editorComponentName": "CompositionO2MEditor",
    "editorQuery": compositionO2MQuery,

    "browserComponentName": "CompositionO2MBrowserTable",
    "browserType": "table",
    "browserQuery": compositionO2MQuery,

    'menuItem': 'ROOT'
  },

  // old
  "queryResults": {
    "query": {
      "name": "carsByType",
      "entityName": "scr_Car"
    },
    "componentName": "scr-cars-by-type-list"
  },
  "serviceForm": {
    "componentName": "scr-add-favorite-form",
    "serviceMethod": {
      "serviceName": "scr_FavoriteService",
      "methodName": "addFavorite"
    }
  },
  "serviceData": {
    "componentName": "scr-add-favorite-data",
    "serviceMethod": {
      "serviceName": "scr_FavoriteService",
      "methodName": "addFavorite"
    }
  }
};
