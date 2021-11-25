import { RadialBar, RadialBarSvgProps } from "@nivo/radial-bar";
import React from "react";
import { Dimensions } from "@nivo/core";
import { defaultChartOptions } from "./default-chart-options";

type RadialBarChartProps = {
  id: string,
  data: any[],
  xKey: string,
  yKey: string,
  nivoRadialBarChartProps?: Partial<RadialBarSvgProps> & Partial<Dimensions>
}

export const RadialBarChart = (props: RadialBarChartProps) => {

  const {id, data, xKey, yKey, nivoRadialBarChartProps} = props;
  const chartData = {
    id,
    data: data.map(item => ({x: item[xKey], y: item[yKey]}))
  }

  const chartProps = {...defaultChartOptions, ...nivoRadialBarChartProps, data:[chartData]};
  return <RadialBar {...chartProps}/>;

}
