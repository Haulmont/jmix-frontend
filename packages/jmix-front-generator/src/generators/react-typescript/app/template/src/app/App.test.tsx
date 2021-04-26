import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { IntlProvider } from "react-intl";
import { JmixAppProvider } from "@haulmont/jmix-react-core";
import { initializeApp } from "@haulmont/jmix-rest";

const jmixREST = initializeApp();

const metadata = {entities: [], enums: []};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <JmixAppProvider
      jmixREST={jmixREST}
      metadata={metadata}
    >
      <IntlProvider locale="en">
        <App />
      </IntlProvider>
    </JmixAppProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
