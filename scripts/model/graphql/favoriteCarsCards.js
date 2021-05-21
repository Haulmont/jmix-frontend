const favoriteCarsCardsQuery = `
{
  id
  _instanceName
  notes

  user {
    id
    _instanceName
  }
  car {
    id
    _instanceName
  }
}
`;

module.exports = favoriteCarsCardsQuery;
