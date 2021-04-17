import * as React from "react";
import CompositionO2OEdit from "./CompositionO2OEdit";
import CompositionO2OBrowse from "./CompositionO2OBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_CompositionO2OTestEntity";
const ROUTING_PATH = "/compositionO2OManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "compositionO2OManagement list",
  <CompositionO2OBrowse />,
  ENTITY_NAME,
  "CompositionO2OManagement"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "compositionO2OManagement",
  <CompositionO2OEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "compositionO2OManagement",
  <CompositionO2OBrowse />
);
