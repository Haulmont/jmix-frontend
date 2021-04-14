import * as React from "react";
import IntIdentityIdMgtTableEdit from "./IntIdentityIdMgtTableEdit";
import IntIdentityIdMgtTableBrowse from "./IntIdentityIdMgtTableBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_IntIdentityIdTestEntity";
const ROUTING_PATH = "/intIdentityIdMgtTableManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "intIdentityIdMgtTableManagement list",
  <IntIdentityIdMgtTableBrowse />,
  ENTITY_NAME
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "intIdentityIdMgtTableManagement",
  <IntIdentityIdMgtTableEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "intIdentityIdMgtTableManagement",
  <IntIdentityIdMgtTableBrowse />
);
