import React from "react";
import AssociationM2OEdit from "./AssociationM2OEdit";
import AssociationM2OBrowse from "./AssociationM2OBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_AssociationM2OTestEntity";
const ROUTING_PATH = "/associationM2OManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "associationM2OManagement list",
  <AssociationM2OBrowse />,
  ENTITY_NAME,
  "AssociationM2OManagement"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "associationM2OManagement",
  <AssociationM2OEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "associationM2OManagement",
  <AssociationM2OBrowse />
);
