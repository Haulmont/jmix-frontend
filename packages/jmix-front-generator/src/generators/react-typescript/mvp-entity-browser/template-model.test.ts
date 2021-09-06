import {GraphQLSchema} from "graphql";
import {loadSchema} from "@graphql-tools/load";
import fs from "fs";
import path from "path";
import gql from "graphql-tag";
import {fail} from "assert";
import { deriveGraphQLBrowserModel } from "./template-model";

describe('deriveEntityModel()', () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await loadSchema(
      fs.readFileSync(path.join(__dirname, '../../../test/common/schema.graphql'), 'utf-8'),
      {loaders: []}
    );
  });

  it('derives entity model', () => {
    deriveGraphQLBrowserModel(gql(QUERY_STRING), schema, gql(MUTATION_STRING));
    fail();
  });
});



const MUTATION_STRING = `
  mutation Upsert_scr_Car($car: inp_scr_Car!) {
    upsert_scr_Car(car: $car) {
      id
    }
  }
`;

const QUERY_STRING = `
query scr_CarList(
          $limit: Int
          $offset: Int
          $orderBy: inp_scr_CarOrderBy
          $filter: [inp_scr_CarFilterCondition]
        ) {
          scr_CarList(
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            filter: $filter
          ) {
            id
            _instanceName
            manufacturer
            model
            regNumber
            purchaseDate
            manufactureDate
            wheelOnRight
            carType
            ecoRank
            maxPassengers
            price
            mileage
            garage {
              id
              _instanceName
            }
            technicalCertificate {
              id
              _instanceName
            }
      
            version
            createdBy
            createdDate
            lastModifiedBy
            lastModifiedDate
          }
        }
    `;