import React from 'react';
import { IMultiTabItem, tabs } from '@haulmont/jmix-react-core';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';
import {TabContent} from '@haulmont/jmix-react-web';

import { CloseOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
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
          <TabContent item={item} />
        </TabPane>
      ))}
    </Tabs>
  );
});
