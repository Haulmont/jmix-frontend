import * as React from "react";
import { Tooltip as TooltipAntd } from "antd";
import { TooltipProps as Props } from "antd/es/tooltip";

export type TooltipProps = Props & {
  children: React.ReactNode;
};

export function Tooltip({ children, ...rest }: TooltipProps) {
  return <TooltipAntd {...rest}>{children}</TooltipAntd>;
}
