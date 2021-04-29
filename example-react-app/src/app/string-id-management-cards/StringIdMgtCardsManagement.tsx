import React from "react";
import StringIdMgtCardsEdit from "./StringIdMgtCardsEdit";
import StringIdMgtCardsBrowse from "./StringIdMgtCardsBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_StringIdTestEntity";
const ROUTING_PATH = "/stringIdMgtCardsManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "stringIdMgtCardsManagement list",
  <StringIdMgtCardsBrowse />,
  ENTITY_NAME,
  "StringIdMgtCardsManagement"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "stringIdMgtCardsManagement",
  <StringIdMgtCardsEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "stringIdMgtCardsManagement",
  <StringIdMgtCardsBrowse />
);
