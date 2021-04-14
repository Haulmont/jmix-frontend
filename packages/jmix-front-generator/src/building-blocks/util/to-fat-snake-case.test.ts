import {expect} from "chai";
import {toFatSnakeCase} from "./to-fat-snake-case";

describe('toFatSnakeCase()', () => {
  it('works with camelCase', () => {
    expect(toFatSnakeCase('carList')).eq('CAR_LIST');
    expect(toFatSnakeCase('someLongerString')).eq('SOME_LONGER_STRING');
    expect(toFatSnakeCase('endsWithX')).eq('ENDS_WITH_X');
  });
  it('works with PascalCase', () => {
    expect(toFatSnakeCase('CarList')).eq('CAR_LIST');
    expect(toFatSnakeCase('Car')).eq('CAR');
  });
  it('works with lowercase', () => {
    expect(toFatSnakeCase('car')).eq('CAR');
  });
  it('works with empty string', () => {
    expect(toFatSnakeCase('')).eq('');
  });
});