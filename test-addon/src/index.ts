import {
  screenStore,
  localesStore,
  menuStore
} from "@amplicode/react-core";
import {SomeScreen1, SomeScreen2} from "./screens";
import {MenuItemProps} from "antd";
import en from "./i18n/en.json";

screenStore.registerScreen("some-screen-1", {
  component: SomeScreen1,
  captionKey: "addons.SomeAddonName.SomeScreen1",
});

screenStore.registerScreen("some-screen-2", {
  component: SomeScreen2,
  captionKey: "addons.SomeAddonName.SomeScreen2",
});

menuStore.addAddonItem<MenuItemProps>({
  type: "MenuItem",
  menuItemProps: {
    caption: "addons.SomeAddonName.SomeScreen1",
    key: "some-screen-1"
  } 
});

menuStore.addAddonItem<MenuItemProps>({
  type: "MenuItem",
  menuItemProps: {
    caption: "addons.SomeAddonName.SomeScreen2",
    key: "some-screen-2"
  } 
});

localesStore.addMessages("en" , en);

export {SomeScreen1, SomeScreen2};
