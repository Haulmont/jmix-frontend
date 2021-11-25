import { BarDatum } from "@nivo/bar";
import React from "react";
import { BarSvgProps } from "@nivo/bar/dist/types/types";
import {BarChart} from "./BarChart";

export const ClusteredBarChart = (props: Omit<BarSvgProps<BarDatum>, 'height' | 'width'>) => {
  return <BarChart
      groupMode="grouped"
      layout="horizontal"
      {...props} />;
}
