import { expect } from "chai";
import {getTopAttributesFromQuery} from "./getTopAttributesFromQuery";

const QUERY_STRING = `
{
  date 
  lines {
    quantity
  }
  amount
  customer {
     name
     email
  }
}
`;

const TOP_LEVEL_ATTRIBUTES = ['date', 'lines', 'amount', 'customer'];

describe('getAttributesFromQuery', () => {
  it('should correctly parse attributes', () => {
    const attributes = getTopAttributesFromQuery(QUERY_STRING);
    expect(attributes).to.have.same.members(TOP_LEVEL_ATTRIBUTES);
  });
});