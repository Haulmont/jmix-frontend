import * as React from "react";
import CarEdit3 from "./CarEdit3";
import CarTable from "./CarTable";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr$Car";
const ROUTING_PATH = "/carManagement3";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "carManagement3 list",
  <CarTable />,
  ENTITY_NAME,
  "CarManagement3"
);
registerEntityEditorScreen(ENTITY_NAME, "carManagement3", <CarEdit3 />);
registerEntityBrowserScreen(ENTITY_NAME, "carManagement3", <CarTable />);
