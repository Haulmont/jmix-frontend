import {Calendar, CalendarSvgProps, DateOrString} from "@nivo/calendar";
import React from "react";
import { Dimensions } from "@nivo/core";
import { defaultChartOptions } from "./default-chart-options";

type CalendarChartProps = {
  from: DateOrString,
  to: DateOrString,
  data: any[],
  dayKey: string,
  valueKey: string,
  nivoCalendarChartProps?: Partial<CalendarSvgProps> & Partial<Dimensions>
}

export const CalendarChart = (props: CalendarChartProps) => {

  const {from, to, data, dayKey, valueKey, nivoCalendarChartProps} = props;
  const chartData = data.map(item => ({day: item[dayKey], value: item[valueKey]}))

  const chartProps = {...defaultChartOptions, ...nivoCalendarChartProps, data:chartData, from, to};
  return <Calendar {...chartProps}/>;

}
