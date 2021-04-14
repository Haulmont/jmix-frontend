import {expect} from "chai";
import {dollarsToUnderscores} from "./dollars-to-underscores";

describe('dollarsToUnderscores()', () => {
  it('replaces $ with _', () => {
    expect(dollarsToUnderscores('scr$Car')).eq('scr_Car');
    expect(dollarsToUnderscores('$abc$def$')).eq('_abc_def_');
  });
});