const { runCmdSync, esc, btoa, amplicodegen } = require("./common");

const ownerListQuery = `
query Get_Owner_List {
  ownerList {
    id
    firstName
    lastName
    city
  }
}
`;

const ownerDetailsQuery = `
query Get_Owner($id: Long) {
  owner(id: $id) {
    id
    firstName
    lastName
    city
    address
    email
    telephone
  }
}
`;

const readOnlyOwnerListAnswers = btoa(JSON.stringify({
  componentName: 'ReadOnlyOwnerList',
  shouldAddToMenu: true,
  query: esc(ownerListQuery),
  mode: 'view'
}));

const readOnlyOwnerListWithDetailsAnswers = btoa(JSON.stringify({
  componentName: 'ReadOnlyOwnerListWithDetails',
  shouldAddToMenu: true,
  query: esc(ownerListQuery),
  mode: 'view with details'
}));

const readOnlyOwnerDetailsAnswers = btoa(JSON.stringify({
  componentName: 'ReadOnlyOwnerDetails',
  shouldAddToMenu: false,
  query: esc(ownerDetailsQuery),
  listQueryName: 'ownerList'
}));

const readOnlyOwnerListCommand = `node ${amplicodegen} react-typescript:entity-list`
+ ` --answers ${readOnlyOwnerListAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/read-only-owner-list`
+ ` --dirShift ../../`;

const readOnlyOwnerListWithDetailsCommand = `node ${amplicodegen} react-typescript:entity-list`
+ ` --answers ${readOnlyOwnerListWithDetailsAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/read-only-owner-list-with-details`
+ ` --dirShift ../../`;

const readOnlyOwnerDetailsCommand = `node ${amplicodegen} react-typescript:entity-details`
+ ` --answers ${readOnlyOwnerDetailsAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/read-only-owner-details`
+ ` --dirShift ../../`;

runCmdSync(readOnlyOwnerListCommand);
runCmdSync(readOnlyOwnerListWithDetailsCommand);
runCmdSync(readOnlyOwnerDetailsCommand);
