import { Button as AntdButton } from "antd";
import * as React from "react";
import { ButtonProps } from "antd/es/button";

export function Button({ children, ...rest }: ButtonProps) {
  return <AntdButton {...rest}>{children}</AntdButton>;
}
