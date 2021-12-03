import * as React from "react";
import { Progress } from "antd";
import { ProgressProps } from "antd/es/progress";

export function ProgressBar({ ...props }: ProgressProps) {
  return <Progress {...props} />;
}
