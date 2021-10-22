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

const readOnlyManagementAnswers = btoa(JSON.stringify({
  listComponentName: 'ReadOnlyOwnerList',
  detailsComponentName: 'ReadOnlyOwnerDetails',
  shouldAddToMenu: true,
  listQuery: esc(ownerListQuery),
  detailsQuery: esc(ownerDetailsQuery),
  listQueryName: 'ownerList',
  mode: 'view with details'
}));

const readOnlyManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
+ ` --answers ${readOnlyManagementAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/read-only-owner`
+ ` --dirShift ../../`;

runCmdSync(readOnlyManagementCommand);
