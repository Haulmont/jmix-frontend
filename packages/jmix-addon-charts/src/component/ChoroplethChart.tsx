import {Choropleth, ChoroplethProps} from "@nivo/geo";
import { defaultChartOptions } from "./default-chart-options";
import React from "react";

export const ChoroplethChart = (props: Omit<ChoroplethProps, 'height' | 'width'>) => {
  return <Choropleth {... {...defaultChartOptions, ...props}} />;
}
