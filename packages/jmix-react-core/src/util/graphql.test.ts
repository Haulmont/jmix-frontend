import {extractEntityName} from "./graphql";

describe('extractEntityName()', () => {
  it('extracts entity name from List query name', () => {
    const queryName = 'scr_CarList';
    expect(extractEntityName(queryName, 'List')).toEqual('scr_Car');
  });
});