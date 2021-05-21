import React, {CSSProperties} from "react";
import { Menu } from "antd";

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: CSSProperties;
}

export const HorizontalMenu: React.FC<Props> = ({children, style}: Props) => {
  return (
    <Menu
      mode={"horizontal"}
      style={{ 
        height: "100%", 
        borderRight: 0 ,
        ...style
      }}
    >
      {children}
    </Menu>
  )
}
