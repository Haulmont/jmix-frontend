import * as React from "react";
import GraphQLEdit from "./GraphQLEdit";
import GraphQLList from "./GraphQLList";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr$Car";
const ROUTING_PATH = "/graphQLManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "graphQLManagement list",
  <GraphQLList />,
  ENTITY_NAME,
  "GraphQLManagement"
);
registerEntityEditorScreen(ENTITY_NAME, "graphQLManagement", <GraphQLEdit />);
registerEntityBrowserScreen(ENTITY_NAME, "graphQLManagement", <GraphQLList />);
