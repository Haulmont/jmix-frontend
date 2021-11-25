import {Network, NetworkSvgProps} from "@nivo/network";
import { defaultChartOptions } from "./default-chart-options";
import React from "react";

export const NetworkChart = (props: Omit<NetworkSvgProps, 'height' | 'width'>) => {
  return <Network {... {...defaultChartOptions, ...props}} />;
}
