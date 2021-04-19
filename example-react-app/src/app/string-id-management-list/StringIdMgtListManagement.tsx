import * as React from "react";
import StringIdMgtListEdit from "./StringIdMgtListEdit";
import StringIdMgtListBrowse from "./StringIdMgtListBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_StringIdTestEntity";
const ROUTING_PATH = "/stringIdMgtListManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "stringIdMgtListManagement list",
  <StringIdMgtListBrowse />,
  ENTITY_NAME,
  "StringIdMgtListManagement"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "stringIdMgtListManagement",
  <StringIdMgtListEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "stringIdMgtListManagement",
  <StringIdMgtListBrowse />
);
