import {base64encode} from "./base64";

describe('base64encode()', () => {
  it('encodes correctly using btoa', () => {
    expect(base64encode('lorem ipsum')).toEqual('bG9yZW0gaXBzdW0=');
  });
});