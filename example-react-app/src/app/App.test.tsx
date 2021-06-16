import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { IntlProvider } from "react-intl";
import { JmixAppProvider } from "@haulmont/jmix-react-core";
import { initializeApp } from "@haulmont/jmix-rest";
import { Modals } from "@haulmont/jmix-react-ui";

const jmixREST = initializeApp();

const metadata = { entities: [], enums: [] };

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <JmixAppProvider jmixREST={jmixREST} metadata={metadata} Modals={Modals}>
      <IntlProvider locale="en">
        <App />
      </IntlProvider>
    </JmixAppProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
