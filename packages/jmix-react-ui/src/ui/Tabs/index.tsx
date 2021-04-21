import React, { useState } from 'react';
import { IMultiTabItem, RouteItem, Screens, ScreensContext, SubMenu, tabs } from '@haulmont/jmix-react-core';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';
import { menuItems } from '../../util/componentsRegistration';

const { TabPane } = Tabs;

function onTabChange(key: string) {
  for (const tab of tabs.tabs) {
    if (tab.key === key) {
      tabs.setActiveTab(tab);
      break;
    }
  }
}

export const MultiTabs = observer(() => {
  if (!tabs.tabs.length) {
    return tabs.homePage as JSX.Element;
  }

  return (
    <Tabs activeKey={tabs.currentTab.key} onChange={onTabChange}>
      {tabs.tabs.map((item) => (
        <TabPane tab={item.title} key={item.key}>
          <Content item={item} />
        </TabPane>
      ))}
    </Tabs>
  )
});

interface IContentProps {
  item: IMultiTabItem;
}

const Content = observer((props: IContentProps) => {
  const {item} = props;
  const [screens] = useState(() => new Screens());

  return (
    <div>
      <ScreensContext.Provider value={screens}>
        {item.content}
      </ScreensContext.Provider>
    </div>
  )
});

function checkRoute(item: RouteItem) {
  if (item.menuLink === window.location.pathname || (window.location.pathname + '/').indexOf(item.menuLink + '/') === 0) {
    tabs.push({
      title: item.caption,
      content: item.component,
      key: item.menuLink
    });
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

