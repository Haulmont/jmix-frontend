/* eslint @typescript-eslint/no-var-requires: "off" */
import { antdLocalesStore } from "./AntdLocalesStore";
const en_US = require("antd/lib/locale/en_US");

describe("i18n antdLocalesStore testing", () => {
  it("initial state of antdLocalesStore", () => {
    const initialLocalesCount = Object.keys(antdLocalesStore.antdLocaleMapping).length;
    expect(initialLocalesCount).toEqual(0);
  });


  it("adding en locale to antdlocalesStore", () => {
    antdLocalesStore.addAntdLocale({
      localeName: "en",
      antdLocale: en_US
    });
    const initialLocalesInfoCount = Object.keys(antdLocalesStore.antdLocaleMapping).length;
    expect(initialLocalesInfoCount).toEqual(1);
  });

})
