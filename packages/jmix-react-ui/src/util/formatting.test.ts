import {toDisplayValue} from './formatting';
import {MetaPropertyInfo, PropertyType} from '@haulmont/jmix-react-core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const mockPropertyInfo: MetaPropertyInfo = {
  attributeType: 'DATATYPE',
  cardinality: 'NONE',
  isTransient: false,
  mandatory: false,
  name: '',
  readOnly: false,
  type: '',
};

function createMockPropertyInfo(type: PropertyType): MetaPropertyInfo {
  return {...mockPropertyInfo, type}
}

function expectMsStripped(type: PropertyType): void {
  expectFormat(type, '2020-02-02 02:02:02.222', '2020-02-02 02:02:02')
}

function expectFormat(type: PropertyType, input: string | number | boolean, output: string | number | boolean = input): void {
  const formatted = toDisplayValue(input, createMockPropertyInfo(type));
  expect(formatted).toEqual(output);
}

describe('toDisplayValue()', () => {
  beforeAll(() => {
    dayjs.extend(customParseFormat);
  });

  it('changes format of DateTime', () => {
    expectMsStripped('DateTime');
  });

  it('changes format of LocalDateTime', () => {
    expectMsStripped('LocalDateTime');
  });

  xit('changes format of OffsetDateTime', () => {
    expectFormat('OffsetDateTime', '2020-02-02 02:02:02.222 +0200', '2020-02-02 02:02:02')
  });

  xit('changes format of OffsetTime', () => {
    expectFormat('OffsetTime', '01:02:03 +0200', '01:02:03');
  });

  it('does not change format of OffsetTime', () => {
    expectFormat('Time', '01:02:03');
  });

  it('does not change format of Date', () => {
    expectFormat('Date', '2020-01-02');
  });

  it('does not change format of Time', () => {
    expectFormat('Time', '01:02:03');
  });

  it('does not change format of LocalDate', () => {
    expectFormat('LocalDate', '2020-01-02');
  });

  it('does not change format of LocalTime', () => {
    expectFormat('LocalTime', '01:02:03');
  });

  it('does not change format of Date', () => {
    expectFormat('Date', '2020-01-02');
  });

  it('does not change format of non-temporal fields', () => {
    expectFormat('Integer', 42);
    expectFormat('Double', 4.2);
    expectFormat('String', 'Lorem ipsum');
    expectFormat('UUID', '00000000-0000-0000-0000-000000000000');
    expectFormat('ByteArray', 'Ynl0ZUFycmF5');
    expectFormat('Boolean', true);
  });
});
