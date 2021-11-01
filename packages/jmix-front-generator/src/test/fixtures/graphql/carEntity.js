const carEntityQuery = `
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
  garage {
    id
    _instanceName
  }
  technicalCertificate {
    id
    _instanceName
  }

  version
  createdBy
  createdDate
  lastModifiedBy
  lastModifiedDate
}
`;

module.exports = carEntityQuery;