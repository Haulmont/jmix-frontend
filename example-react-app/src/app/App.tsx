import React from "react";
import { Layout } from "antd";
import { observer } from "mobx-react";
import Login from "./login/Login";
import Centered from "./common/Centered";
import AppHeader from "./header/AppHeader";
import { ContentArea } from "@haulmont/jmix-react-ui";
import { useMainStore, Router } from "@haulmont/jmix-react-core";
import CenteredLoader from "./CenteredLoader";
import { AppMenu } from "./AppMenu";
import "../routing";
import "./App.css";

const routes = {
  "/": <ContentArea />,
  "/:entityName/:entityId?": <ContentArea />
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
            <Router global routes={routes} />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
});

export default App;
