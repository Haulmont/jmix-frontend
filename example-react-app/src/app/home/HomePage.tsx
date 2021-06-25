import React from "react";
import { FormattedMessage } from "react-intl";
import { registerScreen } from "@haulmont/jmix-react-ui";

const ROUTING_PATH = "/";

export const HomePage = () => (
  <div>
    <FormattedMessage id="home.welcome" /> scr-jmix!
  </div>
);

registerScreen({
  component: HomePage,
  caption: "screen.home",
  screenId: "HomePage",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});
