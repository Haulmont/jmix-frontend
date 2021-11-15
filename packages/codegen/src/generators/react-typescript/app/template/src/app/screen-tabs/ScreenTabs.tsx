import {useScreens, getScreenKey, ScreenMetaContext, screenStore} from "@amplicode/react-core";
import {TabHeading, BreadcrumbsArea} from "@amplicode/react-antd";
import {Tabs} from "antd";
import {observer} from "mobx-react";
import {useLocation} from "react-router-dom";
import {useIntl} from "react-intl";
import {useEffect, useState} from "react";

export const ScreenTabs = observer(() => {
  const {
    tabs,
    activeTab,
    activeBreadcrumb,
    makeTabActive,
    closeTab,
    openInTab
  } = useScreens();

  const location = useLocation();
  const intl = useIntl();

  const [initTab] = useState(activeTab);

  useEffect(() => {
    // Check the URL and if it doesn't match to initTab.key then open the correct tab
    const screenKey = getScreenKey(location.pathname);
    if (screenKey == null || screenKey?.length === 0) {
      return;
    }
    if (initTab?.key !== screenKey) {
      const tabItem = screenStore.screenRegistry[screenKey];
      if (tabItem != null) {
        const {component, props, captionKey} = tabItem;
        openInTab({
          tabCaption: intl.formatMessage({id: captionKey}),
          breadcrumbCaption: intl.formatMessage({id: captionKey}),
          component,
          props,
          tabKey: screenKey
        });
      }
    }
  }, [openInTab, intl, location.pathname, initTab]);

  return (
    <Tabs activeKey={activeTab?.key}
          onChange={makeTabActive}
    >
      {
        tabs.map((tab, index) => (
          <Tabs.TabPane key={tab.key}
                        tab={<TabHeading caption={tab.caption}
                                         onClose={(e) => {
                                           closeTab(tab.key);
                                           e.stopPropagation();
                                         }}
                        />}
          >
            <BreadcrumbsArea breadcrumbs={tab.breadcrumbs} />
            {/* Breadcrumbs are actually nested tabs with invisible tab bar */}
            <Tabs activeKey={activeBreadcrumb?.key}
                  renderTabBar={() => <></>}
            >
              {
                tabs[index].breadcrumbs.map((breadcrumb) => (
                  <Tabs.TabPane key={breadcrumb.key}>
                    <ScreenMetaContext.Provider
                      value={{
                        tabKey: tab.key,
                        breadcrumbKey: breadcrumb.key,
                      }}
                    >
                      {breadcrumb.content}
                    </ScreenMetaContext.Provider>
                  </Tabs.TabPane>
                ))
              }
            </Tabs>
          </Tabs.TabPane>
        ))
      }
    </Tabs>
  );
});
