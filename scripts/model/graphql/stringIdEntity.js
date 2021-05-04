const query = `
{
  identifier
  _instanceName
  description
  productCode

  createTs
  createdBy
  updateTs
  updatedBy
  deleteTs
  deletedBy
  version

  datatypesTestEntity {
    id
    _instanceName
  }
  datatypesTestEntity3 {
    id
    _instanceName
  }
}
`;

module.exports = {
  listQuery: query,
  editQuery: query,
};