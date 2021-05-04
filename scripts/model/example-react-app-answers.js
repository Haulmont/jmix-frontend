const carQueries = require('./graphql/car');
const favoriteCarsCardsQueries = require('./graphql/favoriteCarsCards');
const datatypesTestCardsQueries = require('./graphql/datatypesTestCards');
const datatypesQueries = require('./graphql/datatypesTestEntity');
const datatypes2Queries = require('./graphql/datatypesTestEntity2');
const datatypes3Queries = require('./graphql/datatypesTestEntity3');
const associationM2MQueries = require('./graphql/associationM2M');
const associationM2OQueries = require('./graphql/associationM2O');
const associationO2MQueries = require('./graphql/associationO2M');
const associationO2OQueries = require('./graphql/associationO2O');
const compositionO2MQueries = require('./graphql/compositionO2M');
const compositionO2OQueries = require('./graphql/compositionO2O');

module.exports = {
  "blankComponent": {
    "componentName": "test-blank-component"
  },
  "entityManagement": {
    ...carQueries,
    "editComponentName": "CarEdit",
    "listComponentName": "CarCards",
    "listType": "cards",
    "entity": {
      "name": "scr$Car"
    },
    "managementComponentName": "CarManagement"
  },
  "entityManagement2": {
    ...carQueries,
    "editComponentName": "CarEdit2",
    "listComponentName": "CarList",
    "listType": "list",
    "entity": {
      "name": "scr$Car"
    },
    "managementComponentName": "CarManagement2"
  },
  "entityManagement3": {
    ...carQueries,
    "editComponentName": "CarEdit3",
    "listComponentName": "CarTable",
    "listType": "table",
    "entity": {
      "name": "scr$Car"
    },
    "managementComponentName": "car-management-3"
  },
  "datatypesTest1": {
    ...datatypesQueries,
    "editComponentName": "DatatypesEdit1",
    "listComponentName": "DatatypesBrowse1",
    "listType": "cards",
    "entity": {
      "name": "scr_DatatypesTestEntity"
    },
    "managementComponentName": "DatatypesManagement1",
    "nestedEntityInfo": {
      "compositionO2Oattr": "compositionO2OTestEntity-view",
      "compositionO2Mattr": "compositionO2MTestEntity-view"
    }
  },
  "datatypesTest2": {
    ...datatypesQueries,
    "editComponentName": "DatatypesEdit2",
    "listComponentName": "DatatypesBrowse2",
    "listType": "list",
    "entity": {
      "name": "scr_DatatypesTestEntity"
    },
    "managementComponentName": "DatatypesManagement2",
    "nestedEntityInfo": {
      "compositionO2Oattr": "compositionO2OTestEntity-view",
      "compositionO2Mattr": "compositionO2MTestEntity-view"
    }
  },
  "datatypesTest3": {
    ...datatypesQueries,
    "editComponentName": "DatatypesEdit3",
    "listComponentName": "DatatypesBrowse3",
    "listType": "table",
    "entity": {
      "name": "scr_DatatypesTestEntity"
    },
    "managementComponentName": "DatatypesManagement3",
    "nestedEntityInfo": {
      "compositionO2Oattr": "compositionO2OTestEntity-view",
      "compositionO2Mattr": "compositionO2MTestEntity-view"
    }
  },
  "datatypes2Test": {
    ...datatypes2Queries,
    "editComponentName": "Datatypes2Edit",
    "listComponentName": "Datatypes2Browse",
    "listType": "table",
    "entity": {
      "name": "scr_DatatypesTestEntity2"
    },
    "managementComponentName": "Datatypes2Management",
    "nestedEntityInfo": {
      "datatypesTestEntityAttr": "datatypesTestEntity-view",
      "integerIdTestEntityAttr": "_local",
      "intIdentityIdTestEntityAttr": "_local",
      "stringIdTestEntityAttr": "_local",
      "weirdStringIdTestEntityAttr": "_local"
    }
  },
  "datatypes3Test": {
    ...datatypes3Queries,
    "editComponentName": "Datatypes3Edit",
    "listComponentName": "Datatypes3Browse",
    "listType": "table",
    "entity": {
      "name": "scr_DatatypesTestEntity3"
    },
    "managementComponentName": "Datatypes3Management",
    "nestedEntityInfo": {
      "datatypesTestEntityAttr": "datatypesTestEntity-view",
      "integerIdTestEntityAttr": "_local",
      "intIdentityIdTestEntityAttr": "_local",
      "stringIdTestEntityAttr": "_local",
      "weirdStringIdTestEntityAttr": "_local"
    }
  },

  "associationO2O": {
    ...associationO2OQueries,
    "editComponentName": "AssociationO2OEdit",
    "listComponentName": "AssociationO2OBrowse",
    "listType": "table",
    "entity": {
      "name": "scr_AssociationO2OTestEntity"
    },
    "managementComponentName": "AssociationO2OManagement"
  },
  "associationO2M": {
    ...associationO2MQueries,
    "editComponentName": "AssociationO2MEdit",
    "listComponentName": "AssociationO2MBrowse",
    "listType": "table",
    "entity": {
      "name": "scr_AssociationO2MTestEntity"
    },
    "managementComponentName": "AssociationO2MManagement"
  },
  "associationM2O": {
    ...associationM2OQueries,
    "editComponentName": "AssociationM2OEdit",
    "listComponentName": "AssociationM2OBrowse",
    "listType": "table",
    "entity": {
      "name": "scr_AssociationM2OTestEntity"
    },
    "managementComponentName": "AssociationM2OManagement"
  },
  "associationM2M": {
    ...associationM2MQueries,
    "editComponentName": "AssociationM2MEdit",
    "listComponentName": "AssociationM2MBrowse",
    "listType": "table",
    "entity": {
      "name": "scr_AssociationM2MTestEntity"
    },
    "managementComponentName": "AssociationM2MManagement"
  },

  "compositionO2O": {
    ...compositionO2OQueries,
    "editComponentName": "CompositionO2OEdit",
    "listComponentName": "CompositionO2OBrowse",
    "listType": "table",
    "entity": {
      "name": "scr_CompositionO2OTestEntity"
    },
    "managementComponentName": "CompositionO2OManagement",
    "nestedEntityInfo": {
      "nestedComposition": "deeplyNestedTestEntity-view"
    }
  },
  "compositionO2M": {
    ...compositionO2MQueries,
    "editComponentName": "CompositionO2MEdit",
    "listComponentName": "CompositionO2MBrowse",
    "listType": "table",
    "entity": {
      "name": "scr_CompositionO2MTestEntity"
    },
    "managementComponentName": "CompositionO2MManagement"
  },
  "datatypesTestCards": {
    ...datatypesTestCardsQueries,
    "componentName": "DatatypesCards",
    "entity": {
      "name": "scr_DatatypesTestEntity"
    }
  },
  "favoriteCarsCards": {
    ...favoriteCarsCardsQueries,
    "componentName": "FavoriteCars",
    "entity": {
      "name": "scr$FavoriteCar"
    }
  },
  "entityList": {
    "entityView": {
      "name": "_local",
      "entityName": "scr$Garage"
    },
    "componentName": "scr-garage-list",
    "entity": {
      "name": "scr$Garage"
    }
  },
  "entityEdit": {
    "editView": {
      "name": "car-edit",
      "entityName": "scr$Car"
    },
    "editComponentName": "scr-car-edit",
    "entity": {
      "name": "scr$Car"
    }
  },
  "queryResults": {
    "query": {
      "name": "carsByType",
      "entityName": "scr$Car"
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
