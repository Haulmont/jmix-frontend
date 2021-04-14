import * as React from "react";
import DatatypesEdit3 from "./DatatypesEdit3";
import DatatypesBrowse3 from "./DatatypesBrowse3";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_DatatypesTestEntity";
const ROUTING_PATH = "/datatypesManagement3";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "datatypesManagement3 list",
  <DatatypesBrowse3 />,
  ENTITY_NAME
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "datatypesManagement3",
  <DatatypesEdit3 />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "datatypesManagement3",
  <DatatypesBrowse3 />
);
