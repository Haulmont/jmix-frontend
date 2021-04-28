const query = `
{
  id
  _instanceName
  identifier
  description
  productCode
}
`;
// TODO Add relation attributes

module.exports = {
  listQuery: query,
  editQuery: query,
};