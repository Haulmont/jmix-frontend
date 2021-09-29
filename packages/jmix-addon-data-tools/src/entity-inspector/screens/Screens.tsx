import React from "react";
import { ScreenItem } from "../EntityInspector.types";
import styles from "./Screens.less";

interface Props {
  screens: ScreenItem[],
  activeScreenId?: number
}

export const Screens = ({screens, activeScreenId}: Props) => {
  return (
    <>
      {screens.map(({component, props, id}) => {
        return  (
          <div
            key={id}
            className={id !== activeScreenId ? styles['screen-disabled'] : ""}
          >
            {React.createElement(component, props)}
          </div>
        )
      })}
    </>
  )
}
