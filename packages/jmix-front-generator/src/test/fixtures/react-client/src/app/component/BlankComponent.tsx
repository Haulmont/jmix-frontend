import React from "react";
import { registerScreen } from "@haulmont/jmix-react-web";

const ROUTING_PATH = "/blankComponent";

export const BlankComponent = () => <div>BlankComponent</div>;

registerScreen({
  component: BlankComponent,
  caption: "screen.BlankComponent",
  screenId: "BlankComponent",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});
