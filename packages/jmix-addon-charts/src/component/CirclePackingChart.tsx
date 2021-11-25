import {CirclePacking, CirclePackingSvgProps} from "@nivo/circle-packing";
import { defaultChartOptions } from "./default-chart-options";
import React from "react";

export const CirclePackingChart = (props: Omit<CirclePackingSvgProps<any>, 'height' | 'width'>) => {
  return <CirclePacking {... {...defaultChartOptions, ...props}} />;
}
