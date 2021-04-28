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
  name
  readOnlyStringAttr
}
`;
// TODO Add relation attributes

module.exports = {
  listQuery: datatypesQuery,
  editQuery: datatypesQuery,
};
