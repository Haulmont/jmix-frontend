import {CirclePacking, CirclePackingSvgProps} from "@nivo/circle-packing";
import { defaultChartOptions } from "./default-chart-options";
import React from "react";

export const CirclePackingChart = (props: Partial<Omit<CirclePackingSvgProps<any>, "height" | "width" | "data">> & Pick<CirclePackingSvgProps<any>, "data">) => {
  return <CirclePacking {... {...defaultChartOptions, ...props}} />;
}
