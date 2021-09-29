import React, {useState, useCallback, useEffect, useMemo} from 'react';
import { observer } from 'mobx-react';
import {EntityInspectorMain} from "./entity-inspector-main";
import {EntityDataViewer} from "./entity-data-viewer";
import {EntityDataEditor} from "./entity-data-editor";
import {Breadcrumbs} from "./breadcrumbs";
import {ScreenItem} from "./EntityInspector.types"
import { Screens } from './screens';

export const ROUTING_PATH = `/EntityInspector`;
export const EntityInspector = observer(() => {

  const [screens, setScreens] = useState<ScreenItem[]>([]);

  const openViewerScreen = useCallback((props: any, caption: string) => {
    setScreens((screens) => {
      return [
        ...screens,
        {
          component: EntityDataViewer,
          props,
          caption,
          id: screens.length
        }
      ]
    })
  }, [setScreens]);

  const openEditorScreen = useCallback((props: any, caption: string) => {
    setScreens((screens) => {
      return [
        ...screens,
        {
          component: EntityDataEditor,
          props,
          caption,
          id: screens.length
        }
      ]
    })
  }, [setScreens]);

  const closeActiveScreen = useCallback(() => {
    setScreens((screens) => {
      return [...screens].slice(0, screens.length - 1);
    })
  }, [setScreens]);

  const screensControl = useMemo(() => {
    return {
      openViewerScreen,
      openEditorScreen,
      closeActiveScreen
    }
  }, [openViewerScreen, openEditorScreen, closeActiveScreen]);

  useEffect(() => {
    setScreens([{
      component: EntityInspectorMain,
      props: {
        screensControl,
        routingPath: ROUTING_PATH
      },
      caption: `Entity Inspector`,
      id: 0
    }])
  }, []);

  const [activeScreenId, setActiveScreenId] = useState<number>();

  const onBreadcrumbClickFactory = useCallback((id: number) => {
    const clickHandler = () => {
      setScreens((screens) => {
        return [...screens].slice(0, id + 1);
      })
    }
    return clickHandler;
  }, [setScreens]);

  useEffect(() => {
    if(screens.length > 0) {
      setActiveScreenId(screens[screens.length - 1].id);
    }
  }, [screens]);

  return (
    <div>
      <Breadcrumbs
        screens={screens}
        onBreadcrumbClickFactory={onBreadcrumbClickFactory}
        activeScreenId={activeScreenId}
      />
      <Screens
        screens={screens}
        activeScreenId={activeScreenId}
      />
    </div>
  )
})
