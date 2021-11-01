import {EntityInspector, ROUTING_PATH} from './entity-inspector/EntityInspector';
import { registerScreen, localesStore } from "@haulmont/jmix-react-web";
import {menuStore} from "@haulmont/jmix-react-web";
import {MenuItemProps} from "@haulmont/jmix-react-antd";
import en from "./i18n/en.json";

registerScreen({
  component: EntityInspector,
  caption: "screen.EntityInspector",
  screenId: "EntityInspector",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

menuStore.addAddonItem<MenuItemProps>({
  type: "MenuItem",
  menuItemProps: {
    caption: "screen.EntityInspector",
    screenId: "EntityInspector",
    key: "EntityInspector"
  } 
});

localesStore.addMessages("en" , en);
