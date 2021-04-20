import { DatatypesManagement3 } from "./app/datatypes-test3/DatatypesManagement3";
import { DatatypesManagement2 } from "./app/datatypes-test2/DatatypesManagement2";
import { DatatypesManagement1 } from "./app/datatypes-test1/DatatypesManagement1";
import { CarCardsGrid } from "./app/car-cards-grid/CarCardsGrid";
import { CarManagement3 } from "./app/entity-management3/CarManagement3";
import { CarManagement2 } from "./app/entity-management2/CarManagement2";
import { CarManagement } from "./app/entity-management/CarManagement";
import { FavoriteCars } from "./app/entity-cards/FavoriteCars";
import { StructureComponent } from "./app/structure/StructureComponent";
import { TestBlankComponent } from "./app/blank-components/TestBlankComponent";
import { getMenuItems } from "@haulmont/jmix-react-core";

export const menuItems = getMenuItems();

// Code below demonstrates how we can create SubMenu section
// Remove '/*' '*/' comments and restart app to get this block in menu

/*
// This is RouteItem object that we want to see in User Settings sub menu
const backToHomeRouteItem = {
  pathPattern: "/backToHome",
  menuLink: "/",
  component: null,
  caption: "home"
};
// SubMenu object
const userSettingsSubMenu = {
  caption: 'UserSettings', // add router.UserSettings key to src/i18n/en.json for valid caption
  items: [backToHomeRouteItem]};
// Add sub menu item to menu config
menuItems.push(userSettingsSubMenu);
*/

menuItems.push({
  pathPattern: "/testBlankComponent",
  menuLink: "/testBlankComponent",
  component: TestBlankComponent,
  caption: "TestBlankComponent"
});

menuItems.push({
  pathPattern: "/structureComponent",
  menuLink: "/structureComponent",
  component: StructureComponent,
  caption: "StructureComponent"
});

menuItems.push({
  pathPattern: "/favoriteCars",
  menuLink: "/favoriteCars",
  component: FavoriteCars,
  caption: "FavoriteCars"
});

menuItems.push({
  pathPattern: "/carManagement/:entityId?",
  menuLink: "/carManagement",
  component: CarManagement,
  caption: "CarManagement"
});

menuItems.push({
  pathPattern: "/carManagement2/:entityId?",
  menuLink: "/carManagement2",
  component: CarManagement2,
  caption: "CarManagement2"
});

menuItems.push({
  pathPattern: "/carManagement3/:entityId?",
  menuLink: "/carManagement3",
  component: CarManagement3,
  caption: "CarManagement3"
});

menuItems.push({
  pathPattern: "/carCardsGrid",
  menuLink: "/carCardsGrid",
  component: CarCardsGrid,
  caption: "CarCardsGrid"
});

menuItems.push({
  pathPattern: "/datatypesManagement1/:entityId?",
  menuLink: "/datatypesManagement1",
  component: DatatypesManagement1,
  caption: "DatatypesManagement1"
});

menuItems.push({
  pathPattern: "/datatypesManagement2/:entityId?",
  menuLink: "/datatypesManagement2",
  component: DatatypesManagement2,
  caption: "DatatypesManagement2"
});

menuItems.push({
  pathPattern: "/datatypesManagement3/:entityId?",
  menuLink: "/datatypesManagement3",
  component: DatatypesManagement3,
  caption: "DatatypesManagement3"
});
