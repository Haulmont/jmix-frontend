import React from "react";
import WeirdStringIdMgtTableEdit from "./WeirdStringIdMgtTableEdit";
import WeirdStringIdMgtTableBrowse from "./WeirdStringIdMgtTableBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_WeirdStringIdTestEntity";
const ROUTING_PATH = "/weirdStringIdMgtTableManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "weirdStringIdMgtTableManagement list",
  <WeirdStringIdMgtTableBrowse />,
  ENTITY_NAME,
  "WeirdStringIdMgtTableManagement"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "weirdStringIdMgtTableManagement",
  <WeirdStringIdMgtTableEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "weirdStringIdMgtTableManagement",
  <WeirdStringIdMgtTableBrowse />
);
