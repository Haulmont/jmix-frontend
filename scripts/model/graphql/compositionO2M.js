const compositionO2MQuery = `
{
  id
  _instanceName
  name
  quantity
  deeplyNestedO2Mattr {
    id
    _instanceName
    name
  }  
}
`;

module.exports = compositionO2MQuery;