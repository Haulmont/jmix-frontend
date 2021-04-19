import * as React from "react";
import IntIdMgtTableEdit from "./IntIdMgtTableEdit";
import IntIdMgtTableBrowse from "./IntIdMgtTableBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_IntegerIdTestEntity";
const ROUTING_PATH = "/intIdManagementTable";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "intIdManagementTable list",
  <IntIdMgtTableBrowse />,
  ENTITY_NAME,
  "IntIdManagementTable"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "intIdManagementTable",
  <IntIdMgtTableEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "intIdManagementTable",
  <IntIdMgtTableBrowse />
);
