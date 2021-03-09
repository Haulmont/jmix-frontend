import * as React from "react";
import CarEdit from "./CarEdit";
import CarCards from "./CarCards";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr$Car";
const ROUTING_PATH = "/carManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "carManagement list",
  <CarCards />,
  ENTITY_NAME
);
registerEntityEditorScreen(ENTITY_NAME, "carManagement", <CarEdit />);
registerEntityBrowserScreen(ENTITY_NAME, "carManagement", <CarCards />);
