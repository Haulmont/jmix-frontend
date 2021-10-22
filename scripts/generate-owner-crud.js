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

const ownerDeleteMutation = `
mutation Delete_Owner($id: Long!) {
  delete_Owner(id: $id)
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

const ownerUpsertMutation = `
mutation Update_Owner($input: OwnerInputDTOInput) {
  update_Owner(input: $input) {
    id
  }
}
`;

const ownerManagementAnswers = btoa(JSON.stringify({
  listComponentName: 'OwnerList',
  detailsComponentName: 'OwnerEditor',
  shouldAddToMenu: true,
  listQuery: esc(ownerListQuery),
  detailsQuery: esc(ownerDetailsQuery),
  deleteMutation: esc(ownerDeleteMutation),
  upsertMutation: esc(ownerUpsertMutation),
}));

const ownerManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
+ ` --answers ${ownerManagementAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/owner`
+ ` --dirShift ../../`;

runCmdSync(ownerManagementCommand);