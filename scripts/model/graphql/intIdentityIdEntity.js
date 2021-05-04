const query = `
{
  id
  _instanceName
  description

  updateTs
  updatedBy
  deleteTs
  deletedBy
  createTs
  createdBy
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