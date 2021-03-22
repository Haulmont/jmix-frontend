import * as React from "react";
import Datatypes3Edit from "./Datatypes3Edit";
import Datatypes3Browse from "./Datatypes3Browse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_DatatypesTestEntity3";
const ROUTING_PATH = "/datatypes3Management";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "datatypes3Management list",
  <Datatypes3Browse />,
  ENTITY_NAME
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "datatypes3Management",
  <Datatypes3Edit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "datatypes3Management",
  <Datatypes3Browse />
);
