const datatypesQuery = `
{
  id
  _instanceName
  bigDecimalAttr
  booleanAttr
  dateAttr
  dateTimeAttr
  doubleAttr
  integerAttr
  longAttr
  stringAttr
  charAttr
  timeAttr
  uuidAttr
  localDateTimeAttr
  offsetDateTimeAttr
  localDateAttr
  localTimeAttr
  offsetTimeAttr
  enumAttr
  associationO2Oattr {
    id
    _instanceName
  }
  associationO2Mattr {
    id
    _instanceName
  }
  associationM2Oattr {
    id
    _instanceName
  }
  associationM2Mattr {
    id
    _instanceName
  }
  compositionO2Oattr {
    id
    _instanceName
    name
    quantity
    nestedComposition {
      id
      _instanceName
      name
    }
  }
  compositionO2Mattr {
    id
    _instanceName
    name
    quantity
    deeplyNestedO2Mattr {
      id
      _instanceName
      name
    }    
  }
  intIdentityIdTestEntityAssociationO2OAttr {
    id
    _instanceName
  }
  integerIdTestEntityAssociationM2MAttr {
    id
    _instanceName
  }
  datatypesTestEntity3 {
    id
    _instanceName
  }
  readOnlyStringAttr
  name
}
`;

// stringIdTestEntityAssociationO2O {
//   id
//   _instanceName
// }
// stringIdTestEntityAssociationM2O {
//   id
//   _instanceName
// }

module.exports = datatypesQuery;
