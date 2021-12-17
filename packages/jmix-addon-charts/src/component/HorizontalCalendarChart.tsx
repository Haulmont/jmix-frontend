import {Calendar, CalendarSvgProps, DateOrString} from "@nivo/calendar";
import React from "react";
import { Dimensions } from "@nivo/core";
import { defaultChartOptions } from "./default-chart-options";

type HorizontalCalendarChartProps = {
  from: DateOrString,
  to: DateOrString,
  data: any[],
  dayKey: string,
  valueKey: string,
  nivoHorizontalCalendarChartProps?: Partial<CalendarSvgProps> & Partial<Dimensions>
}

export const HorizontalCalendarChart = (props: HorizontalCalendarChartProps) => {

  const {from, to, data, dayKey, valueKey, nivoHorizontalCalendarChartProps} = props;
  const chartData = data.map(item => ({day: item[dayKey], value: item[valueKey]}))

  const chartProps = {...defaultChartOptions, ...nivoHorizontalCalendarChartProps,
    data:chartData,
    from,
    to,
    direction: 'vertical' as 'vertical'};

  return <Calendar {...chartProps}/>;
}
