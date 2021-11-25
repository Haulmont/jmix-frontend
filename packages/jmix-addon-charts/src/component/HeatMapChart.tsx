import {HeatMap, HeatMapSvgProps} from "@nivo/heatmap";
import { defaultChartOptions } from "./default-chart-options";
import React from "react";

export const HeatMapChart = (props: Omit<HeatMapSvgProps, 'height' | 'width'>) => {
  return <HeatMap {... {...defaultChartOptions, ...props}} />;
}
