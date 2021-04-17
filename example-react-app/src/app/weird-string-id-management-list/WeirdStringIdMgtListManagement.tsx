import * as React from "react";
import WeirdStringIdMgtListEdit from "./WeirdStringIdMgtListEdit";
import WeirdStringIdMgtListBrowse from "./WeirdStringIdMgtListBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_WeirdStringIdTestEntity";
const ROUTING_PATH = "/weirdStringIdMgtListManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "weirdStringIdMgtListManagement list",
  <WeirdStringIdMgtListBrowse />,
  ENTITY_NAME,
  "WeirdStringIdMgtListManagement"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "weirdStringIdMgtListManagement",
  <WeirdStringIdMgtListEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "weirdStringIdMgtListManagement",
  <WeirdStringIdMgtListBrowse />
);
