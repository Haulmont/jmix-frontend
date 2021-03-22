import * as React from "react";
import StringIdMgtTableEdit from "./StringIdMgtTableEdit";
import StringIdMgtTableBrowse from "./StringIdMgtTableBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_StringIdTestEntity";
const ROUTING_PATH = "/stringIdMgtTableManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "stringIdMgtTableManagement list",
  <StringIdMgtTableBrowse />,
  ENTITY_NAME
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "stringIdMgtTableManagement",
  <StringIdMgtTableEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "stringIdMgtTableManagement",
  <StringIdMgtTableBrowse />
);
