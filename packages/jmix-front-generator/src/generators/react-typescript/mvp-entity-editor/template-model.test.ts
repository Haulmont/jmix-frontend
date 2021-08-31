import { loadSchema } from "@graphql-tools/load";
import {deriveGraphQLEditorModel} from "./template-model";
import * as fs from "fs";
import {buildClientSchema, GraphQLSchema} from "graphql";
import * as path from "path";
import gql from "graphql-tag";
import { fail } from "assert";

describe('deriveEntityModel()', () => {
  let schema: GraphQLSchema;

  before(async () => {
    // schema = await loadSchema(
    //   fs.readFileSync(path.join(__dirname, '../../../test/common/schema.graphql'), 'utf-8'),
    //   {loaders: []}
    // );

    schema = buildClientSchema(
      JSON.parse(fs.readFileSync(path.join(__dirname, '../../../test/common/schema.json'), 'utf-8')).data
    );
  });

  it('derives entity model', () => {
    deriveGraphQLEditorModel(gql(QUERY_STRING), gql(MUTATION_STRING), schema);
    fail();
  });
});



const MUTATION_STRING = `
mutation Update_Pet($input: PetInputDTOInput) {
  update_Pet(input: $input) {
    id
  }
}
`;

const QUERY_STRING = `
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