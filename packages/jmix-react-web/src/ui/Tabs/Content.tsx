import React, { useState } from 'react';
import { IMultiTabItem, RouteItem, Screens, ScreensContext, SubMenu, currentRoute } from '@haulmont/jmix-react-core';
import { observer } from 'mobx-react';
import {isDevModeEnabled, CurrentTabContext} from "@haulmont/jmix-react-core";
import { menuItems, openScreen } from '../../screen-registration/screen-registration';

interface IContentProps {
  item: IMultiTabItem;
}

export const TabContent = observer((props: IContentProps) => {
  const {item} = props;
  const [screens] = useState(() => new Screens());
  item.screensInTab = screens;

  return (
    <div>
      <CurrentTabContext.Provider value={item}>
        <ScreensContext.Provider value={screens}>
          {item.content}
        </ScreensContext.Provider>
      </CurrentTabContext.Provider>
    </div>
  );
});

function checkRoute(item: RouteItem) {
  // Quickfix for https://github.com/Haulmont/jmix-frontend/issues/488
  if (isDevModeEnabled()) {
    return;
  }
  // Todo We should think of more correct (non-invasive) behavior

  const url = window.location.hash
    ? new URL(window.location.origin + window.location.hash.replace('#', ''))
    : new URL(window.location.href)

  if (window.location.hash) {
    currentRoute.hashMode = true
  }

  if (item.menuLink === url.pathname || (url.pathname + '/').indexOf(item.menuLink + '/') === 0) {
    openScreen(item.screenId, url.pathname + url.search);
  }
}

function checkItems(mItems: Array<RouteItem | SubMenu>) {
  for (const item of mItems) {
    const subMenuItem = item as SubMenu;
    if (subMenuItem.items != null) {
      checkItems(subMenuItem.items);
    } else {
      checkRoute(item as RouteItem);
    }
  }
}

setTimeout(() => {
  checkItems(menuItems);
}, 1);

window.addEventListener('popstate', () => {
  checkItems(menuItems)
});

