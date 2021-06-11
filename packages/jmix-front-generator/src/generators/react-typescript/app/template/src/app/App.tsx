import React from "react";
import { Layout } from "antd";
import { observer } from "mobx-react";
import Login from "./login/Login";
import Centered from "./common/Centered";
import AppHeader from "./header/AppHeader";
import HomePage from "./home/HomePage";
import { MultiTabs,} from "@haulmont/jmix-react-ui";
import {useMainStore,tabs, Router } from '@haulmont/jmix-react-core';
import CenteredLoader from "./CenteredLoader";
import {AppMenu} from "./AppMenu";
import "../routing";
import "./App.css";

tabs.homePage = <HomePage />;

const routes = {
  '/': <HomePage />,
  '/:entityName/:entityId?': <MultiTabs />,
};


const App = observer(() => {
  const mainStore = useMainStore();
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

  return (
    <Layout className="main-layout">
      <Layout.Header>
        <% if (menuType === 'vertical') { %>
          <AppHeader />
        <% } else { %>
          <AppHeader>
            <AppMenu theme="dark" />
          </AppHeader>
        <% } %>
      </Layout.Header>
      <Layout className="layout-container">
        <% if (menuType === 'vertical') { %>
          <Layout.Sider
            width={200}
            breakpoint="sm"
            collapsedWidth={0}
            className="layout-sider"
          >
            <AppMenu/>
          </Layout.Sider>
        <% } %>
        <Layout className="layout-content">
          <Layout.Content>
            <Router global routes={routes} />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
});

export default App;
