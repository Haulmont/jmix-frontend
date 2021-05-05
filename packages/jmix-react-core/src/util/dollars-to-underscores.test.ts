import {dollarsToUnderscores} from "./dollars-to-underscores";

describe('dollarsToUnderscores()', () => {
  it('replaces $ with _', () => {
    expect(dollarsToUnderscores('scr$Car')).toEqual('scr_Car');
    expect(dollarsToUnderscores('$abc$def$')).toEqual('_abc_def_');
  });
});