const query = require('../model/graphql/formWizardTestEntity');

module.exports = {
  'menuItem': 'ROOT',
  "componentName": "FormWizardEditor",
  "entity": {
    "name": "scr_FormWizardTestEntity"
  },
  query,
  "steps": [
    {
      name: "Step0",
      fieldNames: [
        "id",
        "_instanceName",
        "notNull",
      ]
    },
    {
      name: "Step1",
      fieldNames: [
        "date",
        "time",
        "integer",
      ]
    },
    {
      name: "Step2",
      fieldNames: [
        "associationO2O",
        "compositionO2O",
      ]
    },
  ],
};