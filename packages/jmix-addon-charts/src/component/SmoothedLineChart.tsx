import { Line, LineSvgProps, Serie } from "@nivo/line";
import React from "react";
import { Dimensions } from "@nivo/core";
import { defaultChartOptions } from "./default-chart-options";

type SmoothedLineChartProps = {
    id: string | number,
    data: any[],
    xKey: string,
    yKey: string,
    nivoLineChartProps?: Partial<LineSvgProps> & Partial<Dimensions>
}

export const SmoothedLineChart = (props: SmoothedLineChartProps) => {

    const {id, data, xKey, yKey, nivoLineChartProps} = props;
    const chartData: Serie = {
        id,
        data: data.map(item => ({x: item[xKey], y: item[yKey]}))
    }

    const chartProps = {...defaultChartOptions, ...nivoLineChartProps, data:[chartData], curve: 'cardinal' as 'cardinal'};
    return <Line {...chartProps}/>;

}