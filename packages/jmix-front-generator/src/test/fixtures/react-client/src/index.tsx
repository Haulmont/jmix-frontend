import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app/App";
// import registerServiceWorker from './registerServiceWorker';
import { JmixAppProvider } from "@haulmont/jmix-react-core";
import { I18nProvider } from "@haulmont/jmix-react-ui";
import { HashRouter, Route } from "react-router-dom";
import { initializeApp } from "@haulmont/jmix-rest";
import { JMIX_REST_URL, REST_CLIENT_ID, REST_CLIENT_SECRET } from "./config";
import "mobx-react-lite/batchingForReactDom";
import "antd/dist/antd.min.css";
import "@haulmont/jmix-react-ui/dist/index.min.css";
import "./index.css";
import { antdLocaleMapping, messagesMapping } from "./i18n/i18nMappings";
import "moment/locale/ru";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "./graphql/graphql";

export const jmixREST = initializeApp({
  name: "mpg",
  apiUrl: JMIX_REST_URL,
  restClientId: REST_CLIENT_ID,
  restClientSecret: REST_CLIENT_SECRET,
  storage: window.localStorage,
  defaultLocale: "en"
});

const client = createApolloClient();

ReactDOM.render(
  <JmixAppProvider jmixREST={jmixREST}>
    <ApolloProvider client={client}>
      <I18nProvider
        messagesMapping={messagesMapping}
        antdLocaleMapping={antdLocaleMapping}
      >
        <HashRouter>
          <Route component={App} />
        </HashRouter>
      </I18nProvider>
    </ApolloProvider>
  </JmixAppProvider>,
  document.getElementById("root") as HTMLElement
);
// registerServiceWorker();
