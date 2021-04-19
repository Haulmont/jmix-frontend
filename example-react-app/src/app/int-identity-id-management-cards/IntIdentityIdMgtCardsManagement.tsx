import * as React from "react";
import IntIdentityIdMgtCardsEdit from "./IntIdentityIdMgtCardsEdit";
import IntIdentityIdMgtCardsBrowse from "./IntIdentityIdMgtCardsBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_IntIdentityIdTestEntity";
const ROUTING_PATH = "/intIdentityIdMgtCardsManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "intIdentityIdMgtCardsManagement list",
  <IntIdentityIdMgtCardsBrowse />,
  ENTITY_NAME,
  "IntIdentityIdMgtCardsManagement"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "intIdentityIdMgtCardsManagement",
  <IntIdentityIdMgtCardsEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "intIdentityIdMgtCardsManagement",
  <IntIdentityIdMgtCardsBrowse />
);
