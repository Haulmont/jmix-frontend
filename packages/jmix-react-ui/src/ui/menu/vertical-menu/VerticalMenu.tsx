import React, {CSSProperties} from "react";
import {Menu, MenuProps} from "antd";

interface Props {
  children: (JSX.Element | JSX.Element[]);
  style?: CSSProperties;
}

export function VerticalMenu<T = MenuProps>({children, style, ...restProps}: Props & T) {
  return (
    <Menu
      mode={"inline"}
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
