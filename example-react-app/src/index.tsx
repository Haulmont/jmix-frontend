import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app/App";
import { ComponentPreviews } from "./dev/previews";
import { useDevLogin } from "./dev/hooks";
import { DevSupport } from "@haulmont/react-ide-toolbox";
// import registerServiceWorker from './registerServiceWorker';
import { JmixAppProvider } from "@haulmont/jmix-react-core";
import { I18nProvider } from "@haulmont/jmix-react-ui";
import { initializeApp } from "@haulmont/jmix-rest";
import { JMIX_REST_URL, REST_CLIENT_ID, REST_CLIENT_SECRET } from "./config";
import "mobx-react-lite/batchingForReactDom";

import "antd/dist/antd.min.css";
import "@haulmont/jmix-react-ui/dist/index.min.css";
import "./index.css";
import { antdLocaleMapping, messagesMapping } from "./i18n/i18nMappings";

export const jmixREST = initializeApp({
  name: "scr-jmix",
  apiUrl: JMIX_REST_URL,
  restClientId: REST_CLIENT_ID,
  restClientSecret: REST_CLIENT_SECRET,
  storage: window.localStorage,
  defaultLocale: "en"
});

ReactDOM.render(
  <JmixAppProvider
    jmixREST={jmixREST}
    config={{
      appName: "scr-jmix",
      clientId: REST_CLIENT_ID, // TODO Rename once we remove REST
      secret: REST_CLIENT_SECRET,
      locale: "en"
    }}
  >
    <I18nProvider
      messagesMapping={messagesMapping}
      antdLocaleMapping={antdLocaleMapping}
    >
      <DevSupport
        ComponentPreviews={<ComponentPreviews />}
        useInitialHook={useDevLogin}
      >
        <App />
      </DevSupport>
    </I18nProvider>
  </JmixAppProvider>,
  document.getElementById("root") as HTMLElement
);
// registerServiceWorker();
