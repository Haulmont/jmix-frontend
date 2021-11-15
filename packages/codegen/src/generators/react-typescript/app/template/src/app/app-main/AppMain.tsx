import React from "react";
import {observer} from "mobx-react";
import {Layout} from "antd";
import { AppHeader } from "../app-header/AppHeader";
import './AppMain.css';
import {AppMenu} from "../AppMenu";
import {ScreenTabs} from "../screen-tabs/ScreenTabs";
import {Route, Switch} from "react-router-dom";
import {Page404, CloseAllTabs} from "@amplicode/react-antd";
import {screenStore} from "@amplicode/react-core";

export const AppMain = observer(() => {
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
          <AppMenu />
        </Layout.Sider>

        <Layout className="layout-content">
          <Layout.Content>
            <Switch>
              {/*You can create your own routes in addition to or instead of using the Screen API*/}
              {/*<Route path='/component1'>*/}
              {/*  <Component1/>*/}
              {/*</Route>*/}
              {/*<Route path='/component2'>*/}
              {/*  <Component2/>*/}
              {/*</Route>*/}
              <Route path={screenStore.screenPaths}>
                <ScreenTabs/>
              </Route>
              <Route path='/' exact>
                <CloseAllTabs/>
              </Route>
              <Route>
                <Page404/>
              </Route>
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
});