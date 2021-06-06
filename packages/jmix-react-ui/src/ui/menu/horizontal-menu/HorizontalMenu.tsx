import React, {CSSProperties} from "react";
import {Menu, MenuProps} from "antd";

type Props = {
  children: JSX.Element | JSX.Element[];
  style?: CSSProperties;
}

export function HorizontalMenu<T = MenuProps>({children, style, ...restProps}: Props & T) {
  return (
    <Menu
      mode={"horizontal"}
      style={{ 
        height: "100%", 
        borderRight: 0 ,
        ...style
      }}
      {...restProps}
    >
      {children}
    </Menu>
  )
}
