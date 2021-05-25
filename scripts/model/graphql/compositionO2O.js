const compositionO2OQuery = `
{
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
`;

module.exports = compositionO2OQuery;