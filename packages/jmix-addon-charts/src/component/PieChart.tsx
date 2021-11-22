import { defaultChartOptions } from "./default-chart-options";
import React from "react";
import { Pie } from "@nivo/pie";
import { PieSvgProps } from "@nivo/pie/dist/types/types";

type PieChartProps = {
  data: any[],
  idKey: string,
  labelKey: string,
  valueKey: string,
  nivoPieChartProps?: PieSvgProps<any>
}

export const PieChart = (props: PieChartProps) => {

  const {idKey, labelKey, valueKey, data, nivoPieChartProps} = props;
  const chartData = data.map(item => ({id: item[idKey], label: item[labelKey], value: item[valueKey]}));

  return <Pie {...{...defaultChartOptions, ...nivoPieChartProps, data: chartData}} />;
}
