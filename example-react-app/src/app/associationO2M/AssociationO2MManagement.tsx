import React from "react";
import AssociationO2MEdit from "./AssociationO2MEdit";
import AssociationO2MBrowse from "./AssociationO2MBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_AssociationO2MTestEntity";
const ROUTING_PATH = "/associationO2MManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "associationO2MManagement list",
  <AssociationO2MBrowse />,
  ENTITY_NAME,
  "AssociationO2MManagement"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "associationO2MManagement",
  <AssociationO2MEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "associationO2MManagement",
  <AssociationO2MBrowse />
);
