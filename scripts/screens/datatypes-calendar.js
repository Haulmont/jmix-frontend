const query = require('../model/graphql/datatypesTestEntity');

module.exports = {
  menuItem: 'ROOT',
  componentName: "DatatypesCalendar",
  entity: {
    name: "scr_DatatypesTestEntity"
  },
  query,
  eventStartAttr: 'dateAttr',
  eventEndAttr: "dateTimeAttr",
  titleAttr: "stringAttr",
  descriptionAttrAnswer: "stringAttr",
};