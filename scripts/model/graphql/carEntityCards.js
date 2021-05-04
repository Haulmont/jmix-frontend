const carEntityCardsQuery = `
{
  id
  _instanceName
  manufacturer
  model
  regNumber
  purchaseDate
  manufactureDate
  wheelOnRight
  carType
  ecoRank
  maxPassengers
  price
  mileage
  photo

  version
  createdBy
  createdDate
  lastModifiedBy
  lastModifiedDate
}
`;
// TODO add once Associations are supported:
// garage
// technicalCertificate

module.exports = {
  query: carEntityCardsQuery
};