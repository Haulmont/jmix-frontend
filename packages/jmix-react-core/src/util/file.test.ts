import {extractName} from "./file";

describe('getFileName()', () => {
  it('correctly parses fileRef and returns file name', () => {
    expect(extractName(
      'fs://2021/03/25/3b545812-576c-8a5d-231b-8ee18f9e0906.txt?name=test-file.txt'
    )).toEqual('test-file.txt');
  });

  it('Cyrillic characters in file name', () => {
    expect(extractName(
      'fs://2021/03/26/614f7cb8-cd79-ad36-8b29-3c44c8ee3b2c.txt?name=%D0%BA%D0%B8%D1%80%D0%B8%D0%BB%D0%BB%D0%B8%D1%86%D0%B0.txt'
    )).toEqual('кириллица.txt');
  });

  // TODO enable once https://github.com/Haulmont/jmix-rest/issues/61 is fixed
  xit('spaces and + signs in file name', () => {
    expect(extractName(
      'fs://2021/03/26/9ca40648-751f-53eb-b683-1ba9aacb7210.txt?name=%2B%20%2B%20%2B.txt'
    )).toEqual('+ + +.txt');
  });
});