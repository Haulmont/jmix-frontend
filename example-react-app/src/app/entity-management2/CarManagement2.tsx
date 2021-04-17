import * as React from "react";
import CarEdit2 from "./CarEdit2";
import CarList from "./CarList";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr$Car";
const ROUTING_PATH = "/carManagement2";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "carManagement2 list",
  <CarList />,
  ENTITY_NAME,
  "CarManagement2"
);
registerEntityEditorScreen(ENTITY_NAME, "carManagement2", <CarEdit2 />);
registerEntityBrowserScreen(ENTITY_NAME, "carManagement2", <CarList />);
