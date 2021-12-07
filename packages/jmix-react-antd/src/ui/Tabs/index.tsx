import React from 'react';
import { IMultiTabItem, tabs } from '@haulmont/jmix-react-core';
import { observer } from 'mobx-react';
import { Tabs, Space } from 'antd';
import { TabContent } from '@haulmont/jmix-react-web';
import { CloseOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import { FormattedMessage } from 'react-intl';
import classNames from "classnames";

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

function handleCloseKeyDown(e: React.KeyboardEvent<HTMLSpanElement>, tabItem: IMultiTabItem) {
  if (["Enter", "Space"].includes(e.code)) {
    e.preventDefault();
    tabs.close(tabItem);
  }
}

export const MultiTabs = observer(() => {
  if (!tabs.tabs.length) {
    return null;
  }

  return (
    <Tabs activeKey={tabs.currentTab?.key} onChange={onTabChange} className={styles.tab}>
      {tabs.tabs.map((item) => (
        <TabPane
          tab={
            <Space size={10}>
              <FormattedMessage id={item.title}/>
              <CloseOutlined
                role={"button"}
                tabIndex={0}
                className={classNames(styles.icon, styles.closeButton)}
                onKeyDown={(e) => handleCloseKeyDown(e, item)}
                onClick={(e) => handleCloseClick(e, item)}
              />
            </Space>
          }
          key={item.key}
        >
          <TabContent item={item} />
        </TabPane>
      ))}
    </Tabs>
  );
});
