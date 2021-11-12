import React from "react";
import { Layout } from "antd";
import { observer } from "mobx-react";
import Login from "./login/Login";
import Centered from "./common/Centered";
import AppHeader from "./header/AppHeader";
import { ContentArea } from "@haulmont/jmix-react-antd";
import { useMainStore, Router } from "@haulmont/jmix-react-core";
import { useDefaultTabHotkeys } from "@haulmont/jmix-react-web";
import CenteredLoader from "./CenteredLoader";
import { AppMenu } from "./AppMenu";
import "../routing";
import styles from "./App.module.css";

const routes = {
  "/": <ContentArea />,
  "/:entityName/:entityId?": <ContentArea />
};

const App = observer(() => {
  const mainStore = useMainStore();
  const { initialized, locale, loginRequired } = mainStore;

  useDefaultTabHotkeys();

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
    <Layout className={styles.mainLayout}>
      <Layout.Header>
        <AppHeader />
      </Layout.Header>
      <Layout className={styles.layoutContainer}>
        <Layout.Sider
          width={200}
          breakpoint="sm"
          collapsedWidth={0}
          className={styles.layoutSider}
        >
          <AppMenu />
        </Layout.Sider>

        <Layout className={styles.layoutContent}>
          <Layout.Content>
            <Router global routes={routes} />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
});

export default App;
