import "./i18n/i18nInit";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { ComponentPreviews } from "./dev/previews";
import { useDevLogin } from "./dev/hooks";
import { DevSupport } from "@haulmont/react-ide-toolbox";
import { initializeTheme } from "./themes/themes.core";
// import registerServiceWorker from './registerServiceWorker';
import {
  JmixAppProvider,
  initializeApolloClient,
  Screens,
  ScreensContext
} from "@haulmont/jmix-react-core";
import {
  I18nProvider,
  Modals,
  initializeI18n
} from "@haulmont/jmix-react-antd";
import { initializeApp } from "@haulmont/jmix-rest";
import {
  JMIX_REST_URL,
  REST_CLIENT_ID,
  REST_CLIENT_SECRET,
  GRAPHQL_URI
} from "./config";
import metadata from "./jmix/metadata.json";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import {
  IntlDocumentTitle,
  HotkeyProvider,
  localesStore
} from "@haulmont/jmix-react-web";
import { defaultHotkeyConfigs } from "./hotkeyConfigs";
import "./addons";

// Declare plugin types for dayjs
import "dayjs/plugin/customParseFormat";
import "dayjs/plugin/advancedFormat";
import "dayjs/plugin/weekday";
import "dayjs/plugin/localeData";
import "dayjs/plugin/weekOfYear";
import "dayjs/plugin/weekYear";
import { AppErrorBoundary } from "./app/AppErrorBoundary";

initializeTheme();

initializeI18n({
  defaultLocale: "en",
  getMessages: locale => localesStore.messagesMapping[locale]
});

export const jmixREST = initializeApp({
  name: "",
  apiUrl: JMIX_REST_URL,
  restClientId: REST_CLIENT_ID,
  restClientSecret: REST_CLIENT_SECRET,
  storage: window.localStorage,
  defaultLocale: "en"
});

const client = initializeApolloClient({
  graphqlEndpoint: GRAPHQL_URI,
  tokenStorageKey: "_jmixRestAccessToken",
  localeStorageKey: "_jmixLocale"
});

const devScreens = new Screens();

ReactDOM.render(
  <JmixAppProvider
    apolloClient={client}
    jmixREST={jmixREST}
    config={{
      appName: "",
      clientId: REST_CLIENT_ID, // TODO Rename once we remove REST
      secret: REST_CLIENT_SECRET,
      locale: "en",
      graphqlEndpoint: GRAPHQL_URI
    }}
    metadata={metadata}
    Modals={Modals}
  >
    <ApolloProvider client={client}>
      <I18nProvider>
        <IntlDocumentTitle>
          <HotkeyProvider defaultHotkeyConfigs={defaultHotkeyConfigs}>
            <DevSupport
              ComponentPreviews={
                <ScreensContext.Provider value={devScreens}>
                  <ComponentPreviews />
                </ScreensContext.Provider>
              }
              useInitialHook={useDevLogin}
            >
              <AppErrorBoundary>
                <App />
              </AppErrorBoundary>
            </DevSupport>
          </HotkeyProvider>
        </IntlDocumentTitle>
      </I18nProvider>
    </ApolloProvider>
  </JmixAppProvider>,
  document.getElementById("root") as HTMLElement
);

// registerServiceWorker();
