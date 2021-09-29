import { Breadcrumb } from "antd";
import React from "react";
import { ScreenItem } from "../EntityInspector.types";
import styles from "./Breadcrumbs.less";

interface Props {
  screens: ScreenItem[],
  activeScreenId?: number;
  onBreadcrumbClickFactory: (id: number) => () => void
}

export const Breadcrumbs = (props: Props) => {
  const {screens, onBreadcrumbClickFactory, activeScreenId} = props;
 
  if(screens.length > 1) {
    return (
      <div className={styles['breadcrumbs-container']}>
        <Breadcrumb separator={">"}>
          {screens.map(({caption, id}) => {
            return (
              <Breadcrumb.Item
                key={id}
                className={`
                  ${styles['breadcrumb']}
                  ${id === activeScreenId ? styles['breadcrumb-active'] : ``}`
                }
                onClick={onBreadcrumbClickFactory(id)}
              >
                {caption}
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      </div>
    )
  }
  return null;
}
