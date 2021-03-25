const query = require('../model/graphql/carEntity');

module.exports = {
  query,
  "steps": [
    {
      name: "Step0",
      fieldNames: [
        "id",
        "_instanceName",
        "manufacturer",
        "model",
        "regNumber",
        "purchaseDate",
      ]
    },
    {
      name: "Step1",
      fieldNames: [
        "manufactureDate",
        "wheelOnRight",
        "carType",
        "ecoRank",
        "maxPassengers",
      ]
    },
    {
      name: "Step2",
      fieldNames: [
        "price",
        "mileage",
        "garage",
        "technicalCertificate",
        "photo",
        "version",
        "createdBy",
        "createdDate",
        "lastModifiedBy",
        "lastModifiedDate",
      ]
    },
  ],
  "componentName": "FormSteps",
  "entity": {
    "name": "scr$Car"
  }
};