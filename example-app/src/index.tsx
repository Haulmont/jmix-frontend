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
import { IntlProvider } from "react-intl";
import { SecurityStore } from "./app/security/security";
import en from "./i18n/en.json";
import { GRAPHQL_URI } from "./config";
import { ScreenContext, Screens } from "@amplicode/react-core";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews } from "./dev/previews";
import { useInitial } from "./dev/hook";

export const securityStore = new SecurityStore();

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

const logoutLink = onError(({ networkError }) => {
  if (networkError == null || !("statusCode" in networkError)) {
    return;
  }
  if (networkError.statusCode === 401) {
    securityStore.logout();
  }
});

const client = new ApolloClient({
  link: logoutLink.concat(httpLink),
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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <IntlProvider locale="en" messages={en}>
        <ScreenContext.Provider value={screens}>
          <HashRouter>
            <DevSupport
              ComponentPreviews={<ComponentPreviews />}
              useInitialHook={useInitial}
            >
              <App />
            </DevSupport>
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
