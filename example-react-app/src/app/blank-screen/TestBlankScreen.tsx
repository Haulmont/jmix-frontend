import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";

const ROUTING_PATH = "/testBlankScreen";

export const TestBlankScreen = () => <div>TestBlankScreen</div>;

registerScreen({
  component: TestBlankScreen,
  caption: "screen.TestBlankScreen",
  screenId: "TestBlankScreen",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});
