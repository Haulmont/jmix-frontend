import {Chord, ChordProps} from "@nivo/chord";
import { defaultChartOptions } from "./default-chart-options";
import React from "react";

export const ChordChart = (props: Omit<ChordProps, 'height' | 'width'>) => {
  return <Chord {... {...defaultChartOptions, ...props}} />;
}
