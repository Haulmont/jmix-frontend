import { Bar, BarDatum } from "@nivo/bar";
import { defaultChartOptions } from "./default-chart-options";
import React from "react";
import { BarSvgProps } from "@nivo/bar/dist/types/types";

export const BarChart = (props: Omit<BarSvgProps<BarDatum>, 'height' | 'width'>) => {
  return <Bar {... {...defaultChartOptions, ...props}} />;
}
