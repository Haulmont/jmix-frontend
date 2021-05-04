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
// TODO Add relation attributes

module.exports = {
  listQuery: query,
  editQuery: query,
};