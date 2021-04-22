import * as React from "react";
import GraphQLCardsEdit from "./GraphQLCardsEdit";
import GraphQLCardsBrowser from "./GraphQLCardsBrowser";
import {
  registerEntityEditorScreen,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr$Car";
const ROUTING_PATH = "/graphQLCardsManagement";

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "graphQLCardsManagement list",
  <GraphQLCardsBrowser />,
  ENTITY_NAME,
  "GraphQLCardsManagement"
);
registerEntityEditorScreen(
  ENTITY_NAME,
  "graphQLCardsManagement",
  <GraphQLCardsEdit />
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "graphQLCardsManagement",
  <GraphQLCardsBrowser />
);
