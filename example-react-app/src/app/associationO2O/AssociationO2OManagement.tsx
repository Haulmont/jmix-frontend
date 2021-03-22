import * as React from "react";
import AssociationO2OEdit from "./AssociationO2OEdit";
import AssociationO2OBrowse from "./AssociationO2OBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_AssociationO2OTestEntity";
const ROUTING_PATH = "/associationO2OManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "associationO2OManagement list",
  <AssociationO2OBrowse />,
  ENTITY_NAME
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "associationO2OManagement",
  <AssociationO2OEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "associationO2OManagement",
  <AssociationO2OBrowse />
);
