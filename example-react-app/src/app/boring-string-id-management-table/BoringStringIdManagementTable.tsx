import * as React from "react";
import BoringStringIdMgtTableEdit from "./BoringStringIdMgtTableEdit";
import BoringStringIdMgtTableBrowse from "./BoringStringIdMgtTableBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_BoringStringIdTestEntity";
const ROUTING_PATH = "/boringStringIdManagementTable";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "boringStringIdManagementTable list",
  <BoringStringIdMgtTableBrowse />,
  ENTITY_NAME,
  "BoringStringIdManagementTable"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "boringStringIdManagementTable",
  <BoringStringIdMgtTableEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "boringStringIdManagementTable",
  <BoringStringIdMgtTableBrowse />
);
