import {determineLastNextXInterval, determinePredefinedInterval} from './DataTableIntervalFunctions';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import MockDate from 'mockdate';

describe('Should return correct interval', () => {
  beforeAll(() => {
    dayjs.extend(customParseFormat);

    MockDate.set(new Date(dayjs('2019-09-20T15:45:00').toDate()));
  });

  afterAll(() => {
    MockDate.reset();
  });

  // DAYS

  it('for last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-15T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-19T23:59:59.999');
  });

  it('for last 5 days including current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-16T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T23:59:59.999');
  });

  it('for last 0 days including current', () => {
    const interval = determineLastNextXInterval('last', 0, 'days', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-21T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T23:59:59.999');
  });

  it('for next 5 days excluding current', () => {
    const interval = determineLastNextXInterval('next', 5, 'days', false, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-21T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-25T23:59:59.999');
  });

  it('for next 5 days including current', () => {
    const interval = determineLastNextXInterval('next', 5, 'days', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-24T23:59:59.999');
  });

  // HOURS

  it('for last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T10:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T14:59:59.999');
  });

  it('for last 5 hours including current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T11:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:59:59.999');
  });

  it('for last 0 hours including current', () => {
    const interval = determineLastNextXInterval('last', 0, 'hours', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T16:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:59:59.999');
  });

  it('for next 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('next', 5, 'hours', false, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T16:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T20:59:59.999');
  });

  it('for next 5 hours including current', () => {
    const interval = determineLastNextXInterval('next', 5, 'hours', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T19:59:59.999');
  });

  // MINUTES

  it('for last 5 minutes excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'minutes', false, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:40:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:44:59.999');
  });

  it('for last 5 minutes including current', () => {
    const interval = determineLastNextXInterval('last', 5, 'minutes', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:41:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:45:59.999');
  });

  it('for last 0 minutes including current', () => {
    const interval = determineLastNextXInterval('last', 0, 'minutes', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:46:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:45:59.999');
  });

  it('for next 5 minutes excluding current', () => {
    const interval = determineLastNextXInterval('next', 5, 'minutes', false, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:46:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:50:59.999');
  });

  it('for next 5 minutes including current', () => {
    const interval = determineLastNextXInterval('next', 5, 'minutes', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:45:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:49:59.999');
  });

  // MONTHS

  it('for last 1 months excluding current', () => {
    const interval = determineLastNextXInterval('last', 1, 'months', false, 'dateTime');
    expect(interval.minDate).toEqual('2019-08-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-08-31T23:59:59.999');
  });

  it('for last 3 months excluding current', () => {
    const interval = determineLastNextXInterval('last', 3, 'months', false, 'dateTime');
    expect(interval.minDate).toEqual('2019-06-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-08-31T23:59:59.999');
  });

  it('for last 1 months including current', () => {
    const interval = determineLastNextXInterval('last', 1, 'months', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-30T23:59:59.999');
  });

  it('for last 0 months including current', () => {
    const interval = determineLastNextXInterval('last', 0, 'months', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-10-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-30T23:59:59.999');
  });

  it('for next 1 months excluding current', () => {
    const interval = determineLastNextXInterval('next', 1, 'months', false, 'dateTime');
    expect(interval.minDate).toEqual('2019-10-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-10-31T23:59:59.999');
  });

  it('for next 1 months including current', () => {
    const interval = determineLastNextXInterval('next', 1, 'months', true, 'dateTime');
    expect(interval.minDate).toEqual('2019-09-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-30T23:59:59.999');
  });

  // PREDEFINED

  it('for predefined option "today"', () => {
    const interval = determinePredefinedInterval('today', 'dateTime');
    expect(interval.minDate).toEqual('2019-09-20T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T23:59:59.999');
  });

  it('for predefined option "yesterday"', () => {
    const interval = determinePredefinedInterval('yesterday', 'dateTime');
    expect(interval.minDate).toEqual('2019-09-19T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-19T23:59:59.999');
  });

  it('for predefined option "tomorrow"', () => {
    const interval = determinePredefinedInterval('tomorrow', 'dateTime');
    expect(interval.minDate).toEqual('2019-09-21T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-21T23:59:59.999');
  });

  it('for predefined option "last month"', () => {
    const interval = determinePredefinedInterval('lastMonth', 'dateTime');
    expect(interval.minDate).toEqual('2019-08-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-08-31T23:59:59.999');
  });

  it('for predefined option "this month"', () => {
    const interval = determinePredefinedInterval('thisMonth', 'dateTime');
    expect(interval.minDate).toEqual('2019-09-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-30T23:59:59.999');
  });

  it('for predefined option "next month"', () => {
    const interval = determinePredefinedInterval('nextMonth', 'dateTime');
    expect(interval.minDate).toEqual('2019-10-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-10-31T23:59:59.999');
  });

  // PROPERTY TYPES

  it('for property type "date", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'date');
    expect(interval.minDate).toEqual('2019-09-15');
    expect(interval.maxDate).toEqual('2019-09-19');
  });
  it('for property type "date", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'date');
    expect(interval.minDate).toEqual('2019-09-20');
    expect(interval.maxDate).toEqual('2019-09-20');
  });

  it('for property type "time", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'time');
    expect(interval.minDate).toEqual('00:00:00');
    expect(interval.maxDate).toEqual('23:59:59');
  });
  it('for property type "time", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'time');
    expect(interval.minDate).toEqual('10:00:00');
    expect(interval.maxDate).toEqual('14:59:59');
  });

  it('for property type "localDate", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'localDate');
    expect(interval.minDate).toEqual('2019-09-15');
    expect(interval.maxDate).toEqual('2019-09-19');
  });
  it('for property type "localDate", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'localDate');
    expect(interval.minDate).toEqual('2019-09-20');
    expect(interval.maxDate).toEqual('2019-09-20');
  });

  it('for property type "localTime", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'localTime');
    expect(interval.minDate).toEqual('00:00:00');
    expect(interval.maxDate).toEqual('23:59:59');
  });
  it('for property type "localTime", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'localTime');
    expect(interval.minDate).toEqual('10:00:00');
    expect(interval.maxDate).toEqual('14:59:59');
  });

  it('for property type "localDateTime", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'localDateTime');
    expect(interval.minDate).toEqual('2019-09-15T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-19T23:59:59.999');
  });
  it('for property type "localDateTime", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'localDateTime');
    expect(interval.minDate).toEqual('2019-09-20T10:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T14:59:59.999');
  });

  xit('for property type "offsetDateTime", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'offsetDateTime');
    expect(interval.minDate).toEqual('2019-09-15T00:00:00.000+00:00');
    expect(interval.maxDate).toEqual('2019-09-19T23:59:59.999+00:00');
  });
  xit('for property type "offsetDateTime", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'offsetDateTime');
    expect(interval.minDate).toEqual('2019-09-20T10:00:00.000+00:00');
    expect(interval.maxDate).toEqual('2019-09-20T14:59:59.999+00:00');
  });

  xit('for property type "offsetTime", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'offsetTime');
    expect(interval.minDate).toEqual('00:00:00+00:00');
    expect(interval.maxDate).toEqual('23:59:59+00:00');
  });
  xit('for property type "offsetTime", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'offsetTime');
    expect(interval.minDate).toEqual('10:00:00+00:00');
    expect(interval.maxDate).toEqual('14:59:59+00:00');
  });

});
