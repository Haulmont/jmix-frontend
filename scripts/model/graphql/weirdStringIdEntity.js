const query = `
{
  id
  _instanceName
  identifier
  description
}
`;
// TODO Add relation attributes

module.exports = {
  listQuery: query,
  editQuery: query,
};