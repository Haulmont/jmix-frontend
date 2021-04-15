import * as React from "react";
import AssociationM2MEdit from "./AssociationM2MEdit";
import AssociationM2MBrowse from "./AssociationM2MBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_AssociationM2MTestEntity";
const ROUTING_PATH = "/associationM2MManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "associationM2MManagement list",
  <AssociationM2MBrowse />,
  ENTITY_NAME
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "associationM2MManagement",
  <AssociationM2MEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "associationM2MManagement",
  <AssociationM2MBrowse />
);
