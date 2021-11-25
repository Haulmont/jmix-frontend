import {Funnel} from "@nivo/funnel";
import {defaultChartOptions} from "./default-chart-options";
import React from "react";
import {FunnelSvgProps} from "@nivo/funnel/dist/types/types";

type FunnelChartProps = {
  data: any[],
  idKey: string,
  valueKey: string,
  labelKey?: string,
  funnelNivoProps?: Partial<FunnelSvgProps<any>>
}

export const FunnelChart = (props: FunnelChartProps) => {

  const {data, idKey, valueKey, labelKey, funnelNivoProps} = props;
  const chartData = data.map(item => ({
    id: item[idKey],
    value: item[valueKey],
    label: labelKey == null ? null : item[labelKey]
  }))

  return <Funnel {... {...defaultChartOptions, ...funnelNivoProps, data: chartData}} />;
}
