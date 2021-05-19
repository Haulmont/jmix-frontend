import React, {CSSProperties} from "react";
import { Menu } from "antd";

interface Props {
  children: (JSX.Element | JSX.Element[]);
  style?: CSSProperties;
}

export const VerticalMenu: React.FC<Props> = ({children, style}: Props) => {  
  return (
    <Menu
      mode={"inline"}
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
