import React, {useState, useCallback, useEffect} from 'react';
import {ReactComponent} from "@haulmont/jmix-react-core";
import { registerScreen } from '@haulmont/jmix-react-ui';
import { observer } from 'mobx-react';
import {Breadcrumb} from "antd";
import {EntityInspectorMain} from "./entity-inspector-main";
import "./EntityInspector.css";

export enum ViewerModes {
  ViewWithEdit = "viewWithEdit",
  ViewWithSelection = "viewWithSelection",
  Inspection = 'inspection'
}

export type ScreenItem = {
  component: ReactComponent<any>,
  props: any,
  id: number,
  caption: string
}

export const EntityInspector = observer(() => {

  const [screens, setScreens] = useState<ScreenItem[]>([]);

  useEffect(() => {
    setScreens([{
      component: EntityInspectorMain,
      props: {
        setScreens
      },
      caption: `Entity Inspector`,
      id: 0
    }])
  }, []);

  const [activeScreenId, setActiveScreenId] = useState<number>();

  const breadcrumbOnClick = useCallback((id: number) => {
    const clickHandler = () => {
      setScreens((screens) => {
        return [...screens].slice(0, id + 1);
      })
    }

    return clickHandler;
  }, [])

  useEffect(() => {
    if(screens.length > 0) {
      setActiveScreenId(screens[screens.length - 1].id);
    }
  }, [screens]);

  return (
    <>
      {renderBreadcrumbs(screens, breadcrumbOnClick, activeScreenId)}
      {renderScreens(screens, activeScreenId)}
    </>
  )
})

function renderScreens(screens: ScreenItem[], activeScreenId?: number) {
  return screens.map(({component, props, id}) => {
    return  (
      <div
        key={id}
        className={id !== activeScreenId ? 'entity-inspector-screen_disabled' : ''}
      >
        {React.createElement(component, props)}
      </div>
    )
  })
}

function renderBreadcrumbs(
  screens: ScreenItem[],
  breadcrumbOnClick: (id: number) => () => void,
  activeScreenId?: number,
) {
  return screens.length > 1
   ? (
    <Breadcrumb separator={">"}>
      {screens.map(({caption, id}) => {
        return (
          <Breadcrumb.Item
            key={id}
            className={`
              entity-inspector-breadcrumb 
              ${id === activeScreenId ? `entity-inspector-breadcrumb_active` : ``}`
            }
            onClick={breadcrumbOnClick(id)}
          >
            {caption}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
   )
   : null
}

registerScreen({
  component: EntityInspector,
  caption: "screen.EntityInspector",
  screenId: "EntityInspector",
  menuOptions: {
    pathPattern: "entityInspector",
    menuLink: "entityInspector"
  }
});
