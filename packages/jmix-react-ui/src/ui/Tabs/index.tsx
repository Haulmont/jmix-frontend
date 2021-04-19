import React, { useState } from 'react';
import { IMultiTabItem, RouteItem, Screens, ScreensContext, SubMenu, tabs } from '@haulmont/jmix-react-core';
import { observer } from 'mobx-react';
import { CloseOutlined } from '@ant-design/icons';
import './styles.less';
import { menuItems } from '../../util/componentsRegistration';



export const MultiTabs = observer(() => {
  if (!tabs.tabs.length) {
    return tabs.homePage as JSX.Element;
  }

  return (
    <div>
      <div className="jmix-tabs__container">
        {tabs.tabs.map((item) => <Tab item={item} key={item.key} />)}
      </div>
      <div>
        {tabs.tabs.map((item) => <Content item={item} key={item.key} />)}
      </div>
    </div>
  );
});

interface ITabProps {
  item: IMultiTabItem;
}

const Tab = observer((props: ITabProps) => {
  const {item} = props;

  function handleClick() {
    tabs.currentTab = item;
  }

  function handleClose(e:  React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation();
    tabs.close(item);
  }

  return (
      <div className="jmix-tabs__tab" data-active={item === tabs.currentTab} onClick={handleClick}>
          {item.title}
          <span onClick={handleClose}>
            <CloseOutlined />
          </span>
      </div>
  )
});

const Content = observer((props: ITabProps) => {
  const {item} = props;
  const [screens] = useState(() => new Screens());

  return (
    <div className="jmix-tabs__content" data-visible={item === tabs.currentTab}>
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

function checkItems(mItems: (RouteItem | SubMenu)[]) {
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

