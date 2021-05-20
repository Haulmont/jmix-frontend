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
  }
  compositionO2Mattr {
    id
    _instanceName
    name
    datatypesTestEntity {
      id
      _instanceName
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
  name
}
`;

// readOnlyStringAttr TODO https://github.com/Haulmont/jmix-graphql/issues/85

// stringIdTestEntityAssociationO2O {
//   id
//   _instanceName
// }
// stringIdTestEntityAssociationM2O {
//   id
//   _instanceName
// }

module.exports = {
  listQuery: datatypesQuery,
  editQuery: datatypesQuery,
};
