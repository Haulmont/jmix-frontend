import {TreeMap, TreeMapSvgProps} from "@nivo/treemap";
import { defaultChartOptions } from "./default-chart-options";
import React from "react";

export const TreeMapChart = (props: Omit<TreeMapSvgProps, 'height' | 'width'>) => {
  return <TreeMap {... {...defaultChartOptions, ...props}} />;
}
