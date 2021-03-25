import * as React from "react";
import "./App.css";

import { BarsOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { observer } from "mobx-react";
import Login from "./login/Login";
import Centered from "./common/Centered";
import AppHeader from "./header/AppHeader";
import HomePage from "./home/HomePage";
import { menuItems, MultiTabs } from "@haulmont/jmix-react-ui";
import {
  injectMainStore,
  MainStoreInjected,
  RouteItem,
  SubMenu,
  tabs,
  Router,
  redirect
} from "@haulmont/jmix-react-core";
import { CenteredLoader } from "./CenteredLoader";
import {
  FormattedMessage,
  injectIntl,
  IntlFormatters,
  WrappedComponentProps
} from "react-intl";
import "../routing";

tabs.homePage = <HomePage />;

const routes = {
  "/": <HomePage />,
  "/:entityName/:entityId?": <MultiTabs />
};

class AppComponent extends React.Component<
  MainStoreInjected & WrappedComponentProps
> {
  render() {
    const mainStore = this.props.mainStore!;
    const { initialized, locale, loginRequired } = mainStore;

    if (!initialized || !locale) {
      return <CenteredLoader />;
    }

    if (loginRequired) {
      return (
        <Centered>
          <Login />
        </Centered>
      );
    }

    const menuIdx = 1;

    return (
      <Layout className="main-layout">
        <Layout.Header>
          <AppHeader />
        </Layout.Header>
        <Layout className="layout-container">
          <Layout.Sider
            width={200}
            breakpoint="sm"
            collapsedWidth={0}
            className="layout-sider"
          >
            <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
              <Menu.Item key={menuIdx} onClick={tabs.closeAll}>
                <HomeOutlined />
                <FormattedMessage id="router.home" />
              </Menu.Item>
              {menuItems.map((item, idx) =>
                menuItem(item, "" + (idx + 1 + menuIdx), this.props.intl)
              )}
            </Menu>
          </Layout.Sider>
          <Layout className="layout-content">
            <Layout.Content>
              <Router global routes={routes} />
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

function menuItem(
  item: RouteItem | SubMenu,
  keyString: string,
  intl: IntlFormatters
) {
  // Sub Menu

  if ((item as any).items != null) {
    //recursively walk through sub menus
    return (
      <Menu.SubMenu
        key={keyString}
        title={intl.formatMessage({
          id: "router." + item.caption
        })}
      >
        {(item as SubMenu).items.map((ri, index) =>
          menuItem(ri, keyString + "-" + (index + 1), intl)
        )}
      </Menu.SubMenu>
    );
  }

  // Route Item
  const routeItem = item as RouteItem;

  function handleClick() {
    tabs.push({
      title: routeItem.caption,
      content: routeItem.component,
      key: routeItem.menuLink
    });
    //window.history.pushState({}, "", routeItem.menuLink);
    redirect(routeItem.menuLink);
  }

  return (
    <Menu.Item key={keyString} onClick={handleClick}>
      <BarsOutlined />
      <FormattedMessage id={"router." + item.caption} />
    </Menu.Item>
  );
}

function collectRouteItems(items: Array<RouteItem | SubMenu>): RouteItem[] {
  return items.reduce((acc, curr) => {
    if ((curr as SubMenu).items == null) {
      // Route item
      acc.push(curr as RouteItem);
    } else {
      // Items from sub menu
      acc.push(...collectRouteItems((curr as SubMenu).items));
    }
    return acc;
  }, [] as Array<RouteItem>);
}

const App = injectIntl(injectMainStore(observer(AppComponent)));

export default App;
