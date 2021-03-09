import * as React from "react";
import CompositionO2MEdit from "./CompositionO2MEdit";
import CompositionO2MBrowse from "./CompositionO2MBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_CompositionO2MTestEntity";
const ROUTING_PATH = "/compositionO2MManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "compositionO2MManagement list",
  <CompositionO2MBrowse />,
  ENTITY_NAME
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "compositionO2MManagement",
  <CompositionO2MEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "compositionO2MManagement",
  <CompositionO2MBrowse />
);
