import React from "react";
import { Layout, Result } from "antd";
import { observer } from "mobx-react";
import Login from "./login/Login";
import Centered from "./common/Centered";
import AppHeader from "./header/AppHeader";
import { ContentArea } from "@haulmont/jmix-react-antd";
import { useMainStore, Router, ErrorBoundary } from "@haulmont/jmix-react-core";
import CenteredLoader from "./CenteredLoader";
import { AppMenu } from "./AppMenu";
import "../routing";
import styles from "./App.module.css";
import { useIntl } from "react-intl";

const routes = {
  '/': <ContentArea />,
  '/:entityName/:entityId?': <ContentArea />,
};

const App = observer(() => {
  const mainStore = useMainStore();
  const { initialized, locale, loginRequired } = mainStore;

  if (!initialized || !locale) {
    return <CenteredLoader />;
  }

  if (loginRequired) {
    return (
      <AppErrorBoundary>
        <Centered>
          <Login/>
        </Centered>
      </AppErrorBoundary>
    );
  }

  return (
    <AppErrorBoundary>
      <Layout className={styles.mainLayout}>
        <Layout.Header>
          <% if (menuType === 'vertical') { %>
            <AppHeader />
          <% } else { %>
            <AppHeader>
              <AppMenu theme="dark" />
            </AppHeader>
          <% } %>
        </Layout.Header>
        <Layout className={styles.layoutContainer}>
          <% if (menuType === 'vertical') { %>
            <Layout.Sider
              width={200}
              breakpoint="sm"
              collapsedWidth={0}
              className={styles.layoutSider}
            >
              <AppMenu/>
            </Layout.Sider>
          <% } %>
          <Layout className={styles.layoutContent}>
            <Layout.Content>
              <Router global routes={routes} />
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </AppErrorBoundary>
  );
});

const AppErrorBoundary = function (props) {
  const intl = useIntl();

  return (
    <ErrorBoundary
      message={intl.formatMessage({id: "common.unknownAppError"})}
      render={message => <Result status="warning" title={message}/>}
    >
      {props.children}
    </ErrorBoundary>
  );
}

export default App;
