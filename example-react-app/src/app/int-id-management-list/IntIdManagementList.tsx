import * as React from "react";
import IntIdMgtListEdit from "./IntIdMgtListEdit";
import IntIdMgtListBrowse from "./IntIdMgtListBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_IntegerIdTestEntity";
const ROUTING_PATH = "/intIdManagementList";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "intIdManagementList list",
  <IntIdMgtListBrowse />,
  ENTITY_NAME
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "intIdManagementList",
  <IntIdMgtListEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "intIdManagementList",
  <IntIdMgtListBrowse />
);
