import * as React from "react";
import Datatypes2Edit from "./Datatypes2Edit";
import Datatypes2Browse from "./Datatypes2Browse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_DatatypesTestEntity2";
const ROUTING_PATH = "/datatypes2Management";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "datatypes2Management list",
  <Datatypes2Browse />,
  ENTITY_NAME,
  "Datatypes2Management"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "datatypes2Management",
  <Datatypes2Edit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "datatypes2Management",
  <Datatypes2Browse />
);
