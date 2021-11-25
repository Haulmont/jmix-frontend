import React from "react";
import { Dimensions } from "@nivo/core";
import { defaultChartOptions } from "./default-chart-options";
import {ScatterPlot} from "@nivo/scatterplot";
import {ScatterPlotSvgProps} from "@nivo/scatterplot/dist/types/types";


type ScatterChartProps = {
  id: string | number,
  data: any[],
  xKey: string,
  yKey: string,
  nivoScatterChartProps?: Partial<ScatterPlotSvgProps<any>> & Partial<Dimensions>
}

export const ScatterChart = (props: ScatterChartProps) => {

  const {id, data, xKey, yKey, nivoScatterChartProps} = props;
  const chartData = {
    id,
    data: data.map(item => ({x: item[xKey], y: item[yKey]}))
  }

  const chartProps = {...defaultChartOptions, ...nivoScatterChartProps, data:[chartData]};
  return <ScatterPlot {...chartProps}/>;

}
