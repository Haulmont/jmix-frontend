import * as React from "react";
import IntIdentityIdMgtListEdit from "./IntIdentityIdMgtListEdit";
import IntIdentityIdMgtListBrowse from "./IntIdentityIdMgtListBrowse";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_IntIdentityIdTestEntity";
const ROUTING_PATH = "/intIdentityIdMgtListManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "intIdentityIdMgtListManagement list",
  <IntIdentityIdMgtListBrowse />,
  ENTITY_NAME,
  "IntIdentityIdMgtListManagement"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "intIdentityIdMgtListManagement",
  <IntIdentityIdMgtListEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "intIdentityIdMgtListManagement",
  <IntIdentityIdMgtListBrowse />
);
