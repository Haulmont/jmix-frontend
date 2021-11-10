import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import "antd/dist/antd.min.css";
import axios from "axios";
import { HashRouter } from "react-router-dom";
import { onError } from "@apollo/client/link/error";
import { createIntl, IntlProvider } from "react-intl";
import en from "./i18n/en.json";
import { GRAPHQL_URI } from "./config";
import {
  HotkeyContext,
  HotkeyStore,
  ScreenContext,
  Screens
} from "@amplicode/react-core";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews } from "./dev/previews";
import { useInitial } from "./dev/hook";
import { defaultHotkeyConfigs } from "./hotkeyConfigs";
import { securityStore } from "./security-store";
import { notification } from "antd";

axios.interceptors.response.use(response => {
  if (response.status === 401) {
    securityStore.logout();
  }
  return response;
});

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
  credentials: "same-origin"
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
  // TODO code below assumes that GraphQL server returns
  // {"errors":[{"extensions":{"classification":"UNAUTHORIZED"}}], ...}
  // for not authenticated user
  // and
  // {"errors":[{"extensions":{"classification":"FORBIDDEN"}}], ...}
  // if user has not enough permissions for query.
  // If the server handles errors differently, or has a different response structure, code below should be modified.

  if (graphQLErrors != null && graphQLErrors.length > 0) {
    if (
      graphQLErrors.some(
        err => err.extensions?.classification === "UNAUTHORIZED"
      )
    ) {
      securityStore.logout();
      return;
    }

    if (
      graphQLErrors.some(
        err => err.extensions?.classification === "FORBIDDEN"
      )
    ) {
      const intl = createIntl({locale: 'en', messages: en});
      notification.error({
        message: intl.formatMessage({ id: "common.notAllowed" })
      });
      return;
    }
  }

  if (networkError == null || !("statusCode" in networkError)) {
    return;
  }
  if (networkError.statusCode === 401) {
    securityStore.logout();
  }
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only"
    },
    watchQuery: {
      fetchPolicy: "cache-and-network"
    }
  }
});

// To customize screens behavior, pass a config object to Screens constructor
const screens = new Screens();

const hotkeys = new HotkeyStore(defaultHotkeyConfigs);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <IntlProvider locale="en" messages={en}>
        <ScreenContext.Provider value={screens}>
          <HashRouter>
            <HotkeyContext.Provider value={hotkeys}>
              <DevSupport
                ComponentPreviews={<ComponentPreviews />}
                useInitialHook={useInitial}
              >
                <App />
              </DevSupport>
            </HotkeyContext.Provider>
          </HashRouter>
        </ScreenContext.Provider>
      </IntlProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
