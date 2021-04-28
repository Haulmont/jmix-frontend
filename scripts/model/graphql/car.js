const carQuery = `
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
}
`;
// TODO add once Associations are supported:
// garage
// technicalCertificate

module.exports = {
  listQuery: carQuery,
  editQuery: carQuery
};