const { runCmdSync, esc, btoa, amplicodegen } = require("./common");

const petListQuery = `
query Get_Pet_List {
  petList {
     id
     identificationNumber
     owner {
       firstName
       lastName
     }
  }
}
`;

const petDeleteMutation = `
mutation Delete_Pet($id: Long!) {
  delete_Pet(id: $id)
}
`;

const petDetailsQuery = `
query Get_Pet($id: Long) {
  pet(id: $id) {
    id
    identificationNumber
    owner {
      firstName
      lastName
    }
  }
}
`;

const petUpsertMutation = `
mutation Update_Pet($input: PetInputDTOInput) {
  update_Pet(input: $input) {
    id
  }
}
`;

const petListAnswers = btoa(JSON.stringify({
  componentName: 'PetList',
  shouldAddToMenu: true,
  query: esc(petListQuery),
  mutation: esc(petDeleteMutation),
}));

const petEditorAnswers = btoa(JSON.stringify({
  componentName: "PetEditor",
  shouldAddToMenu: false,
  query: esc(petDetailsQuery),
  mutation: esc(petUpsertMutation),
  listQueryName: "petList"
}));

const petListCommand = `node ${amplicodegen} react-typescript:entity-list`
+ ` --answers ${petListAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/pet-list`
+ ` --dirShift ../../`;

const petEditorCommand = `node ${amplicodegen} react-typescript:entity-details`
+ ` --answers ${petEditorAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/petEditor`
+ ` --dirShift ../../`;

runCmdSync(petListCommand);
runCmdSync(petEditorCommand);