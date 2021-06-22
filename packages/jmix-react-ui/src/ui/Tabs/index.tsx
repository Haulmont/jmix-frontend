import React, { useState } from 'react';
import { IMultiTabItem, RouteItem, Screens, ScreensContext, SubMenu, tabs } from '@haulmont/jmix-react-core';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';
import {menuItems, openScreenInTab} from '../../screen-registration/screen-registration';
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
    return tabs.homePage as JSX.Element;
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
  if (item.menuLink === window.location.pathname || (window.location.pathname + '/').indexOf(item.menuLink + '/') === 0) {
    openScreenInTab(item.screenId, window.location.pathname + window.location.search);
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

