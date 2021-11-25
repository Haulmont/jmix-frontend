import { Waffle, WaffleSvgProps, WaffleFillDirection } from "@nivo/waffle";
import React from "react";
import { Dimensions } from "@nivo/core";
import { defaultChartOptions } from "./default-chart-options";

type HorizontalWaffleChartProps = {
  total: number,
  rows: number,
  columns: number,
  idKey: string,
  labelKey: string,
  valueKey: string,
  data: any[],
  nivoHorizontalWaffleChartProps?: Partial<WaffleSvgProps> & Partial<Dimensions>
}

export const HorizontalWaffleChart = (props: HorizontalWaffleChartProps) => {

  const {total, rows, columns, idKey, labelKey, valueKey, data, nivoHorizontalWaffleChartProps} = props;

  const chartData = data.map(item => ({id: item[idKey], label: item[labelKey], value: item[valueKey]}));

  const chartProps = {...defaultChartOptions, ...nivoHorizontalWaffleChartProps, data:chartData,
    total, rows, columns, fillDirection: 'left' as WaffleFillDirection};
  return <Waffle {...chartProps}/>;

}
