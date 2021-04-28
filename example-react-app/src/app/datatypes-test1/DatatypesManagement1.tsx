import React from "react";
import DatatypesEdit1 from "./DatatypesEdit1";
import DatatypesBrowse1 from "./DatatypesBrowse1";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_DatatypesTestEntity";
const ROUTING_PATH = "/datatypesManagement1";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "datatypesManagement1 list",
  <DatatypesBrowse1 />,
  ENTITY_NAME,
  "DatatypesManagement1"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "datatypesManagement1",
  <DatatypesEdit1 />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "datatypesManagement1",
  <DatatypesBrowse1 />
);
