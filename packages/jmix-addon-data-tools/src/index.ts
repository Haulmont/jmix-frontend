import {EntityInspector, ROUTING_PATH} from './entity-inspector/EntityInspector';
import { registerScreen } from "@haulmont/jmix-react-web";

registerScreen({
  component: EntityInspector,
  caption: "screen.EntityInspector",
  screenId: "EntityInspector",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});
