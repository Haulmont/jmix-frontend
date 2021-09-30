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

const ownerListAnswers = btoa(JSON.stringify({
  componentName: 'OwnerList',
  shouldAddToMenu: true,
  query: esc(ownerListQuery),
  mutation: esc(ownerDeleteMutation)
}));

const ownerEditorAnswers = btoa(JSON.stringify({
  componentName: 'OwnerEditor',
  shouldAddToMenu: false,
  query: esc(ownerDetailsQuery),
  mutation: esc(ownerUpsertMutation),
  listQueryName: 'ownerList'
}));

const ownerListCommand = `
${amplicodegen} react-typescript:mvp-entity-browser \\
  --answers ${ownerListAnswers} \\
  --schema ./schema.graphql \\
  --dest ../example-app/src/app/owner-list \\
  --dirShift ../../
`;

const ownerEditorCommand = `
${amplicodegen} react-typescript:mvp-entity-editor \\
  --answers ${ownerEditorAnswers} \\
  --schema ./schema.graphql \\
  --dest ../example-app/src/app/owner-editor \\
  --dirShift ../../
`;

runCmdSync(ownerListCommand);
runCmdSync(ownerEditorCommand);