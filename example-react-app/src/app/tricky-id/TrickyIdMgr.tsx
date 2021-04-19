import * as React from "react";
import TrickyIdEdit from "./TrickyIdEdit";
import TrickyIdList from "./TrickyIdList";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_TrickyIdTestEntity";
const ROUTING_PATH = "/trickyIdMgr";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "trickyIdMgr list",
  <TrickyIdList />,
  ENTITY_NAME,
  "TrickyIdMgr"
);
registerEntityEditorScreen(ENTITY_NAME, "trickyIdMgr", <TrickyIdEdit />);
registerEntityBrowserScreen(ENTITY_NAME, "trickyIdMgr", <TrickyIdList />);
