import dayjs, {Dayjs} from 'dayjs';
import {TemporalInterval, DataTableIntervalEditorMode, PredefinedIntervalOption, TimeUnit} from './DataTableIntervalEditor';
import {applyDataTransferFormat, PropertyType} from '@haulmont/jmix-react-core';

const selectMinDateForInterval = (
  mode: DataTableIntervalEditorMode,
  numberOfUnits: number,
  timeUnit: TimeUnit,
  includeCurrent: boolean,
): Dayjs => {
  if (mode === 'last' && includeCurrent) {
    return dayjs()
      .subtract(numberOfUnits - 1, timeUnit)
      .startOf(timeUnit);
  }
  if (mode === 'last' && !includeCurrent) {
    return dayjs()
      .subtract(numberOfUnits, timeUnit)
      .startOf(timeUnit);
  }
  if (mode === 'next' && includeCurrent) {
    return dayjs()
      .add(0, timeUnit)
      .startOf(timeUnit);
  }
  if (mode === 'next' && !includeCurrent) {
    return dayjs()
      .add(1, timeUnit)
      .startOf(timeUnit);
  }

  throw new Error(`Expected 'last' or 'next' mode, encountered '${mode}' mode`);
}

const selectMaxDateForInterval = (
  mode: DataTableIntervalEditorMode,
  numberOfUnits: number,
  timeUnit: TimeUnit,
  includeCurrent: boolean,
): Dayjs => {
  if (mode === 'last' && includeCurrent) {
    return dayjs()
      .subtract(0, timeUnit)
      .endOf(timeUnit);
  }
  if (mode === 'last' && !includeCurrent) {
    return dayjs()
      .subtract(1, timeUnit)
      .endOf(timeUnit);
  }
  if (mode === 'next' && includeCurrent) {
    return dayjs()
      .add(numberOfUnits - 1, timeUnit)
      .endOf(timeUnit);
  }
  if (mode === 'next' && !includeCurrent) {
    return dayjs()
      .add(numberOfUnits, timeUnit)
      .endOf(timeUnit);
  }

  throw new Error(`Expected 'last' or 'next' mode, encountered '${mode}' mode`);
}

/**
 * Creates a {@link TemporalInterval} based on input in form of "last|next number of time units including|excluding current".
 * For example, "last 5 days including current day".
 *
 * @param mode 'last' or 'next', will throw an error if a different value is encountered
 * @param numberOfUnits
 * @param timeUnit see {@link TimeUnit}
 * @param includeCurrent
 * @param propertyType
 */
export function determineLastNextXInterval(
  mode: DataTableIntervalEditorMode,
  numberOfUnits: number,
  timeUnit: TimeUnit,
  includeCurrent: boolean,
  propertyType: PropertyType
): TemporalInterval {
  return {
    minDate: applyDataTransferFormat(
      selectMinDateForInterval(mode, numberOfUnits, timeUnit, includeCurrent),
      propertyType,
    ),
    maxDate: applyDataTransferFormat(
      selectMaxDateForInterval(mode, numberOfUnits, timeUnit, includeCurrent),
      propertyType,
    ),
  };
}

/**
 * Creates a {@link TemporalInterval} that corresponds to a given {@link PredefinedIntervalOption}
 *
 * @param option see {@link PredefinedIntervalOption}
 * @param propertyType
 */
export function determinePredefinedInterval(option: PredefinedIntervalOption, propertyType: PropertyType): TemporalInterval {
  let minDate: Dayjs;
  let maxDate: Dayjs;

  switch (option) {
    case 'today':
      minDate = dayjs().startOf('day');
      maxDate = dayjs().endOf('day');
      break;
    case 'yesterday':
      minDate = dayjs().subtract(1, 'days').startOf('day');
      maxDate = dayjs().subtract(1, 'days').endOf('day');
      break;
    case 'tomorrow':
      minDate = dayjs().add(1, 'days').startOf('day');
      maxDate = dayjs().add(1, 'days').endOf('day');
      break;
    case 'lastMonth':
      minDate = dayjs().subtract(1, 'months').startOf('month');
      maxDate = dayjs().subtract(1, 'months').endOf('month');
      break;
    case 'thisMonth':
      minDate = dayjs().startOf('month');
      maxDate = dayjs().endOf('month');
      break;
    case 'nextMonth':
      minDate = dayjs().add(1, 'months').startOf('month');
      maxDate = dayjs().add(1, 'months').endOf('month');
      break;
    default:
      throw new Error('Unexpected PredefinedIntervalOption' + option);
  }

  return {
    minDate: applyDataTransferFormat(minDate, propertyType),
    maxDate: applyDataTransferFormat(maxDate, propertyType)
  };
}
