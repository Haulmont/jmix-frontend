import React, { useContext, useState } from 'react';
import { MultiScreen } from '../ui/MultiScreen';
import { getMenuItems, ScreensContext, tabs } from '@haulmont/jmix-react-core';
import { observer } from 'mobx-react';
import { sleep, currentRoute } from '@haulmont/jmix-react-core';

export const menuItems = getMenuItems();

export const routerData = {
  history: null as any,
  location: null as any,
  match: null as any,
};

export interface IReferenceItem {
  entityList: {
    title: string;
    content: React.ReactNode;
  };
  entityItemEdit: {
    title: string;
    content: React.ReactNode;
  };
  entityItemNew: {
    title: string;
    content: React.ReactNode;
  };
}

export interface IReferenceList {
  [k: string]: IReferenceItem;
}

export const referencesListByEntityName: IReferenceList = {};


function getRefItem(entityName: string) {
  if (!referencesListByEntityName[entityName]) {
    referencesListByEntityName[entityName] = {
      entityItemEdit: {
        title: '',
        content: null,
      },
      entityItemNew: {
        title: '',
        content: null,
      },
      entityList: {
        title: '',
        content: null,
      },
    };
  }

  return referencesListByEntityName[entityName];
}

/**
 * Registration screens that present entity list view.
 * Important: File with this function must be included in src/routing.ts.
 *
 * @param entityName - name of your entity
 * @param title - page title
 * @param component - your screen component. Example: <MyComponent />
 */
export function registerEntityBrowserScreen(entityName: string, title: string, component: React.ReactNode) {
  const refItem = getRefItem(entityName);
  refItem.entityList.title = title;
  refItem.entityList.content = component;
}

/**
 * Registration screens that present entity creation view.
 * Important: File with this function must be included in src/routing.ts.
 *
 * @param entityName - name of your entity
 * @param title - page title
 * @param component - your screen component. Example: <MyComponent />
 */
export function registerEntityCreatorScreen(entityName: string, title: string, component: React.ReactNode) {
  const refItem = getRefItem(entityName);
  refItem.entityItemNew.title = title;
  refItem.entityItemNew.content = component;
}


/**
 * Registration screens that present entity edit view. Also this function register entity creation view if that wasn't previously defined.
 * Important: File with this function must be included in src/routing.ts.
 *
 * @param entityName - name of your entity
 * @param title - page title
 * @param component - your screen component. Example: <MyComponent />
 */
export function registerEntityEditorScreen(entityName: string, title: string, component: React.ReactNode) {
  const refItem = getRefItem(entityName);
  refItem.entityItemEdit.title = title;
  refItem.entityItemEdit.content = component;

  // Add new item component doesn't register yet
  if (refItem.entityItemNew.content === null) {
    refItem.entityItemNew.title = title;
    refItem.entityItemNew.content = component;
  }
}

/**
 * Register route
 * Important: File with this function must be included in src/routing.ts.
 *
 * @param routePath - router path param. See router docs. Example: '/my_list_view/:entityId?'
 * @param menuPath - link that use side menu for this page. Example: '/my_list_view'
 * @param title - page title for breadcrumbs in multi screen.
 * @param component - your screen component. Example: <MyComponent />.
 * @param entityName - name of your entity.
 * @param screenId - id of the screen
 */
export function registerRoute(routePath: string, menuPath: string, title: string, component: React.ReactChild, entityName: string, screenId: string) {
  const Comp = observer(() => {
    const screens = useContext(ScreensContext);

    screens.currentRootPageData.title = title;
    screens.currentRootPageData.menuPath = menuPath;

    useState(() => {
      screens.closeAll();

      screens.push({
        title,
        content: component
      });

      const entityId = currentRoute.routeParams.entityId;
      if (entityId && tabs.tabs.length === 1) {
        (async () => {
          await sleep();
          const registeredReferral = referencesListByEntityName[entityName];

          screens.push({
            title: registeredReferral.entityItemEdit.title,
            content: registeredReferral.entityItemEdit.content,
            params: {
              entityId,
            },
          });
        })();
      }
    });

    return <MultiScreen />;
  });

  menuItems.push({
    pathPattern: routePath,
    menuLink: menuPath,
    component: <Comp />,
    caption: title,
    screenId,
  });
}
