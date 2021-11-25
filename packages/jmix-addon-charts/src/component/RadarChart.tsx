import {Radar, RadarSvgProps} from "@nivo/radar";
import { defaultChartOptions } from "./default-chart-options";
import React from "react";

export const RadarChart = (props: Omit<RadarSvgProps<any>, 'height' | 'width'>) => {
  return <Radar {... {...defaultChartOptions, ...props}} />;
}
