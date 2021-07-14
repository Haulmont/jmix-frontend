import {determineLastNextXInterval, determinePredefinedInterval} from './DataTableIntervalFunctions';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import MockDate from 'mockdate';

const systemTimeZone = dayjs().format('Z');

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
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-15T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-19T23:59:59.999');
  });

  it('for last 5 days including current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-16T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T23:59:59.999');
  });

  it('for last 0 days including current', () => {
    const interval = determineLastNextXInterval('last', 0, 'days', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-21T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T23:59:59.999');
  });

  it('for next 5 days excluding current', () => {
    const interval = determineLastNextXInterval('next', 5, 'days', false, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-21T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-25T23:59:59.999');
  });

  it('for next 5 days including current', () => {
    const interval = determineLastNextXInterval('next', 5, 'days', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-24T23:59:59.999');
  });

  // HOURS

  it('for last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T10:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T14:59:59.999');
  });

  it('for last 5 hours including current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T11:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:59:59.999');
  });

  it('for last 0 hours including current', () => {
    const interval = determineLastNextXInterval('last', 0, 'hours', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T16:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:59:59.999');
  });

  it('for next 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('next', 5, 'hours', false, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T16:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T20:59:59.999');
  });

  it('for next 5 hours including current', () => {
    const interval = determineLastNextXInterval('next', 5, 'hours', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T19:59:59.999');
  });

  // MINUTES

  it('for last 5 minutes excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'minutes', false, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:40:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:44:59.999');
  });

  it('for last 5 minutes including current', () => {
    const interval = determineLastNextXInterval('last', 5, 'minutes', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:41:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:45:59.999');
  });

  it('for last 0 minutes including current', () => {
    const interval = determineLastNextXInterval('last', 0, 'minutes', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:46:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:45:59.999');
  });

  it('for next 5 minutes excluding current', () => {
    const interval = determineLastNextXInterval('next', 5, 'minutes', false, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:46:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:50:59.999');
  });

  it('for next 5 minutes including current', () => {
    const interval = determineLastNextXInterval('next', 5, 'minutes', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T15:45:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T15:49:59.999');
  });

  // MONTHS

  it('for last 1 months excluding current', () => {
    const interval = determineLastNextXInterval('last', 1, 'months', false, 'DateTime');
    expect(interval.minDate).toEqual('2019-08-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-08-31T23:59:59.999');
  });

  it('for last 3 months excluding current', () => {
    const interval = determineLastNextXInterval('last', 3, 'months', false, 'DateTime');
    expect(interval.minDate).toEqual('2019-06-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-08-31T23:59:59.999');
  });

  it('for last 1 months including current', () => {
    const interval = determineLastNextXInterval('last', 1, 'months', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-30T23:59:59.999');
  });

  it('for last 0 months including current', () => {
    const interval = determineLastNextXInterval('last', 0, 'months', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-10-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-30T23:59:59.999');
  });

  it('for next 1 months excluding current', () => {
    const interval = determineLastNextXInterval('next', 1, 'months', false, 'DateTime');
    expect(interval.minDate).toEqual('2019-10-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-10-31T23:59:59.999');
  });

  it('for next 1 months including current', () => {
    const interval = determineLastNextXInterval('next', 1, 'months', true, 'DateTime');
    expect(interval.minDate).toEqual('2019-09-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-30T23:59:59.999');
  });

  // PREDEFINED

  it('for predefined option "today"', () => {
    const interval = determinePredefinedInterval('today', 'DateTime');
    expect(interval.minDate).toEqual('2019-09-20T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T23:59:59.999');
  });

  it('for predefined option "yesterday"', () => {
    const interval = determinePredefinedInterval('yesterday', 'DateTime');
    expect(interval.minDate).toEqual('2019-09-19T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-19T23:59:59.999');
  });

  it('for predefined option "tomorrow"', () => {
    const interval = determinePredefinedInterval('tomorrow', 'DateTime');
    expect(interval.minDate).toEqual('2019-09-21T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-21T23:59:59.999');
  });

  it('for predefined option "last month"', () => {
    const interval = determinePredefinedInterval('lastMonth', 'DateTime');
    expect(interval.minDate).toEqual('2019-08-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-08-31T23:59:59.999');
  });

  it('for predefined option "this month"', () => {
    const interval = determinePredefinedInterval('thisMonth', 'DateTime');
    expect(interval.minDate).toEqual('2019-09-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-30T23:59:59.999');
  });

  it('for predefined option "next month"', () => {
    const interval = determinePredefinedInterval('nextMonth', 'DateTime');
    expect(interval.minDate).toEqual('2019-10-01T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-10-31T23:59:59.999');
  });

  // PROPERTY TYPES

  it('for property type "date", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'Date');
    expect(interval.minDate).toEqual('2019-09-15');
    expect(interval.maxDate).toEqual('2019-09-19');
  });
  it('for property type "date", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'Date');
    expect(interval.minDate).toEqual('2019-09-20');
    expect(interval.maxDate).toEqual('2019-09-20');
  });

  it('for property type "time", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'Time');
    expect(interval.minDate).toEqual('00:00:00');
    expect(interval.maxDate).toEqual('23:59:59');
  });
  it('for property type "time", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'Time');
    expect(interval.minDate).toEqual('10:00:00');
    expect(interval.maxDate).toEqual('14:59:59');
  });

  it('for property type "LocalDate", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'LocalDate');
    expect(interval.minDate).toEqual('2019-09-15');
    expect(interval.maxDate).toEqual('2019-09-19');
  });
  it('for property type "LocalDate", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'LocalDate');
    expect(interval.minDate).toEqual('2019-09-20');
    expect(interval.maxDate).toEqual('2019-09-20');
  });

  it('for property type "LocalTime", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'LocalTime');
    expect(interval.minDate).toEqual('00:00:00');
    expect(interval.maxDate).toEqual('23:59:59');
  });
  it('for property type "LocalTime", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'LocalTime');
    expect(interval.minDate).toEqual('10:00:00');
    expect(interval.maxDate).toEqual('14:59:59');
  });

  it('for property type "LocalDateTime", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'LocalDateTime');
    expect(interval.minDate).toEqual('2019-09-15T00:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-19T23:59:59.999');
  });
  it('for property type "LocalDateTime", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'LocalDateTime');
    expect(interval.minDate).toEqual('2019-09-20T10:00:00.000');
    expect(interval.maxDate).toEqual('2019-09-20T14:59:59.999');
  });

  it('for property type "OffsetDateTime", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'OffsetDateTime');
    expect(interval.minDate).toEqual(`2019-09-15T00:00:00.000${systemTimeZone}`);
    expect(interval.maxDate).toEqual(`2019-09-19T23:59:59.999${systemTimeZone}`);
  });
  it('for property type "OffsetDateTime", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'OffsetDateTime');
    expect(interval.minDate).toEqual(`2019-09-20T10:00:00.000${systemTimeZone}`);
    expect(interval.maxDate).toEqual(`2019-09-20T14:59:59.999${systemTimeZone}`);
  });

  it('for property type "OffsetTime", last 5 days excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'days', false, 'OffsetTime');
    expect(interval.minDate).toEqual(`00:00:00${systemTimeZone}`);
    expect(interval.maxDate).toEqual(`23:59:59${systemTimeZone}`);
  });
  it('for property type "OffsetTime", last 5 hours excluding current', () => {
    const interval = determineLastNextXInterval('last', 5, 'hours', false, 'OffsetTime');
    expect(interval.minDate).toEqual(`10:00:00${systemTimeZone}`);
    expect(interval.maxDate).toEqual(`14:59:59${systemTimeZone}`);
  });

});
