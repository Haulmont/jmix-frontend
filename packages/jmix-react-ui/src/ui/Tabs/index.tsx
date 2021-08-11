import React, { useState } from 'react';
import { IMultiTabItem, RouteItem, Screens, ScreensContext, SubMenu, tabs } from '@haulmont/jmix-react-core';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';
import {menuItems, openScreen} from '../../screen-registration/screen-registration';
import { CloseOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import {FormattedMessage} from 'react-intl';
import {isDevModeEnabled, CurrentTabContext} from "@haulmont/jmix-react-core";

const {TabPane} = Tabs;

function onTabChange(key: string) {
  for (const tab of tabs.tabs) {
    if (tab.key === key) {
      tabs.setActiveTab(tab);
      break;
    }
  }
}

function handleCloseClick(e: any, tabItem: IMultiTabItem) {
  e.stopPropagation();
  tabs.close(tabItem);
}

export const MultiTabs = observer(() => {
  if (!tabs.tabs.length) {
    return null;
  }

  return (
    <Tabs activeKey={tabs.currentTab?.key} onChange={onTabChange}>
      {tabs.tabs.map((item) => (
        <TabPane
          tab={
            <>
              <FormattedMessage id={item.title} />
              <CloseOutlined className={styles.icon} onClick={(e) => handleCloseClick(e, item)} />
            </>
          }
          key={item.key}
        >
          <CurrentTabContext.Provider value={item}>
            <Content item={item} />
          </CurrentTabContext.Provider>
        </TabPane>
      ))}
    </Tabs>
  );
});

interface IContentProps {
  item: IMultiTabItem;
}

const Content = observer((props: IContentProps) => {
  const {item} = props;
  const [screens] = useState(() => new Screens());
  item.screensInTab = screens;

  return (
    <div>
      <ScreensContext.Provider value={screens}>
        {item.content}
      </ScreensContext.Provider>
    </div>
  );
});

function checkRoute(item: RouteItem) {
  // Quickfix for https://github.com/Haulmont/jmix-frontend/issues/488
  if (isDevModeEnabled()) {
    return;
  }
  // Todo We should think of more correct (non-invasive) behavior

  if (item.menuLink === window.location.pathname || (window.location.pathname + '/').indexOf(item.menuLink + '/') === 0) {
    openScreen(item.screenId, window.location.pathname + window.location.search);
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

