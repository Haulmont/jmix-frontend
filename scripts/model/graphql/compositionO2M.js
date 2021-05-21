const query = `
{
  id
  _instanceName
  name
  quantity
  datatypesTestEntity {
    id
    _instanceName
  }
}
`;

module.exports = {
  listQuery: query,
  editQuery: query,
};