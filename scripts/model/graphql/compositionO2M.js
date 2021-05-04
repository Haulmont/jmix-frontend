const query = `
{
  id
  _instanceName
  name
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