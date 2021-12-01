import React, { useState } from 'react';
import { currentRoute, IMultiTabItem, RouteItem, Screens, ScreensContext, SubMenu, tabs } from '@haulmont/jmix-react-core';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';
import {menuItems, openScreen} from '../../screen-registration/screen-registration';
import { CloseOutlined } from '@ant-design/icons';
import './styles.less';
import {FormattedMessage} from 'react-intl';

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
    <Tabs activeKey={tabs.currentTab.key} onChange={onTabChange}>
      {tabs.tabs.map((item) => (
        <TabPane
          tab={
            <>
              <FormattedMessage id={item.title} />
              <CloseOutlined className="jmix-tab-icon" onClick={(e) => handleCloseClick(e, item)} />
            </>
          }
          key={item.key}
        >
          <Content item={item} />
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

