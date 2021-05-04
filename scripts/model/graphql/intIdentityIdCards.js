const intIdentityIdCardsQuery = `
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
  query: intIdentityIdCardsQuery
};