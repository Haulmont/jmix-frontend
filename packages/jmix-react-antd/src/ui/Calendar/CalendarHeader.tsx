import React from 'react';
import {useIntl} from "react-intl";
import { GenerateConfig } from 'rc-picker/lib/generate';
import { Locale } from 'rc-picker/lib/interface';
import { Select } from 'antd';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import { Dayjs } from 'dayjs';
import { useLocaleReceiver } from 'antd/es/locale-provider/LocaleReceiver'

const YearSelectOffset = 10;
const YearSelectTotal = 20;

interface SharedProps<DateType> {
  prefixCls: string;
  value: DateType;
  validRange?: [DateType, DateType];
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  fullscreen: boolean;
  divRef: React.RefObject<HTMLDivElement>;
  onChange: (year: DateType) => void;
}

/**
 * It is taking from antd library.
 */
function YearSelect<DateType>(props: SharedProps<DateType>) {
  const intl = useIntl();
  const {
    fullscreen,
    validRange,
    generateConfig,
    locale,
    prefixCls,
    value,
    onChange,
    divRef,
  } = props;

  const year = generateConfig.getYear(value || generateConfig.getNow());

  let start = year - YearSelectOffset;
  let end = start + YearSelectTotal;

  if (validRange) {
    start = generateConfig.getYear(validRange[0]);
    end = generateConfig.getYear(validRange[1]) + 1;
  }

  const suffix = locale && locale.year === '年' ? '年' : '';
  const options: { label: string; value: number }[] = [];
  for (let index = start; index < end; index++) {
    options.push({ label: `${index}${suffix}`, value: index });
  }

  return (
    <Select
      size={fullscreen ? undefined : 'small'}
      options={options}
      value={year}
      className={`${prefixCls}-year-select`}
      onChange={numYear => {
        let newDate = generateConfig.setYear(value, numYear);

        if (validRange) {
          const [startDate, endDate] = validRange;
          const newYear = generateConfig.getYear(newDate);
          const newMonth = generateConfig.getMonth(newDate);
          if (
            newYear === generateConfig.getYear(endDate) &&
            newMonth > generateConfig.getMonth(endDate)
          ) {
            newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(endDate));
          }
          if (
            newYear === generateConfig.getYear(startDate) &&
            newMonth < generateConfig.getMonth(startDate)
          ) {
            newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(startDate));
          }
        }

        onChange(newDate);
      }}
      getPopupContainer={() => divRef!.current!}
      aria-label={intl.formatMessage({id: "a11y.select.Year"})}
    />
  );
}

/**
 * It is taking from antd library.
 */
function MonthSelect<DateType>(props: SharedProps<DateType>) {
  const intl = useIntl();
  const {
    prefixCls,
    fullscreen,
    validRange,
    value,
    generateConfig,
    locale,
    onChange,
    divRef,
  } = props;
  const month = generateConfig.getMonth(value || generateConfig.getNow());

  let start = 0;
  let end = 11;

  if (validRange) {
    const [rangeStart, rangeEnd] = validRange;
    const currentYear = generateConfig.getYear(value);
    if (generateConfig.getYear(rangeEnd) === currentYear) {
      end = generateConfig.getMonth(rangeEnd);
    }
    if (generateConfig.getYear(rangeStart) === currentYear) {
      start = generateConfig.getMonth(rangeStart);
    }
  }

  const months = locale.shortMonths || generateConfig.locale.getShortMonths!(locale.locale);
  const options: { label: string; value: number }[] = [];
  for (let index = start; index <= end; index += 1) {
    options.push({
      label: months[index],
      value: index,
    });
  }

  return (
    <Select
      size={fullscreen ? undefined : 'small'}
      className={`${prefixCls}-month-select`}
      value={month}
      options={options}
      onChange={newMonth => {
        onChange(generateConfig.setMonth(value, newMonth));
      }}
      getPopupContainer={() => divRef!.current!}
      aria-label={intl.formatMessage({id: "a11y.select.Month"})}
    />
  );
}

export interface CalendarHeaderProps {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}

/**
 * It is taking from antd library.
 * The default header contains a month selector which is not needed for us.
 * TODO CalendarHeader could be removed after antd calendar will correct support `mode="month"`.
 */
export function CalendarHeader(props: CalendarHeaderProps) {
  const {onChange} = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const prefixCls = 'ant-picker-calendar';
  const fullscreen = true;

  const sharedProps = {
    ...props,
    prefixCls,
    generateConfig: dayjsGenerateConfig,
    onChange,
    fullscreen,
    divRef,
  };

  const [locale] = useLocaleReceiver("Calendar") as any

  return (
    <div className={`${prefixCls}-header`} ref={divRef}>
      <YearSelect<Dayjs> {...sharedProps} locale = {locale.lang} />
      <MonthSelect<Dayjs> {...sharedProps} locale = {locale.lang} />
    </div>
  );
}
