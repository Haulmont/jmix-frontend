import React from "react";
import DatatypesEdit2 from "./DatatypesEdit2";
import DatatypesBrowse2 from "./DatatypesBrowse2";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_DatatypesTestEntity";
const ROUTING_PATH = "/datatypesManagement2";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "datatypesManagement2 list",
  <DatatypesBrowse2 />,
  ENTITY_NAME,
  "DatatypesManagement2"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "datatypesManagement2",
  <DatatypesEdit2 />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "datatypesManagement2",
  <DatatypesBrowse2 />
);
