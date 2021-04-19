import * as React from "react";
import WeirdStringIdMgtCardsEdit from "./WeirdStringIdMgtCardsEdit";
import WeirdStringIdMgtCardsBrowse from "./WeirdStringIdMgtCardsBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_WeirdStringIdTestEntity";
const ROUTING_PATH = "/weirdStringIdMgtCardsManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "weirdStringIdMgtCardsManagement list",
  <WeirdStringIdMgtCardsBrowse />,
  ENTITY_NAME,
  "WeirdStringIdMgtCardsManagement"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "weirdStringIdMgtCardsManagement",
  <WeirdStringIdMgtCardsEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "weirdStringIdMgtCardsManagement",
  <WeirdStringIdMgtCardsBrowse />
);
