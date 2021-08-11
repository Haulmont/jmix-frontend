import { loadSchema } from "@graphql-tools/load";
import {deriveQueryModel} from "./template-model";
import * as fs from "fs";
import {GraphQLSchema} from "graphql";
import * as path from "path";
import gql from "graphql-tag";
import { fail } from "assert";

describe('deriveEntityModel()', () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await loadSchema(
      fs.readFileSync(path.join(__dirname, '../../../test/common/schema.graphql'), 'utf-8'),
      {loaders: []}
    );
  });

  it('derives entity model', () => {
    deriveQueryModel(gql(QUERY_STRING), schema);
    fail();
  });
});

const QUERY_STRING = `
      query scr_CarById($id: String!) {
        scr_CarById(id: $id) {
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
    
        scr_GarageList {
          id
          _instanceName
        }
    
        scr_TechnicalCertificateList {
          id
          _instanceName
        }
      }
    `;