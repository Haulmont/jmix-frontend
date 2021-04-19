import * as React from "react";
import IntIdMgtCardsEdit from "./IntIdMgtCardsEdit";
import IntIdMgtCardsBrowse from "./IntIdMgtCardsBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_IntegerIdTestEntity";
const ROUTING_PATH = "/intIdManagementCards";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "intIdManagementCards list",
  <IntIdMgtCardsBrowse />,
  ENTITY_NAME,
  "IntIdManagementCards"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "intIdManagementCards",
  <IntIdMgtCardsEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "intIdManagementCards",
  <IntIdMgtCardsBrowse />
);
