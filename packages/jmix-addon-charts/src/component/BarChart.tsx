import { Bar, BarDatum } from "@nivo/bar";
import { defaultChartOptions } from "./default-chart-options";
import React from "react";
import { BarSvgProps } from "@nivo/bar/dist/types/types";

export const BarChart = (props: BarSvgProps<BarDatum>) => {
  return <Bar {... {...defaultChartOptions, ...props}} />;
}
