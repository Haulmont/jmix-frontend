const datatypesTestCardsQuery = `
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
  readOnlyStringAttr
}
`;

module.exports = {
  query: datatypesTestCardsQuery
};