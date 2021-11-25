import { Waffle, WaffleSvgProps } from "@nivo/waffle";
import React from "react";
import { Dimensions } from "@nivo/core";
import { defaultChartOptions } from "./default-chart-options";

type WaffleChartProps = {
  total: number,
  rows: number,
  columns: number,
  idKey: string,
  labelKey: string,
  valueKey: string,
  data: any[],
  nivoWaffleChartProps?: Partial<WaffleSvgProps> & Partial<Dimensions>
}

export const WaffleChart = (props: WaffleChartProps) => {

  const {total, rows, columns, idKey, labelKey, valueKey, data, nivoWaffleChartProps} = props;

  const chartData = data.map(item => ({id: item[idKey], label: item[labelKey], value: item[valueKey]}));

  const chartProps = {...defaultChartOptions, ...nivoWaffleChartProps, data:chartData, total, rows, columns};
  return <Waffle {...chartProps}/>;

}
