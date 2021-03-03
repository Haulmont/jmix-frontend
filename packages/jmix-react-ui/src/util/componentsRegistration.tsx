import React, { useState } from 'react';
import { MultiScreen } from '../ui/MultiScreen';
import { getMenuItems } from '@haulmont/jmix-react-core';
import { observer } from 'mobx-react';
import { screens } from '@haulmont/jmix-react-core';
import { sleep } from '@haulmont/jmix-react-core';

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

export function registerEntityBrowserScreen(entityName: string, title: string, component: React.ReactNode) {
  const refItem = getRefItem(entityName);
  refItem.entityList.title = title;
  refItem.entityList.content = component;
}

export function registerEntityCreatorScreen(entityName: string, title: string, component: React.ReactNode) {
  const refItem = getRefItem(entityName);
  refItem.entityItemNew.title = title;
  refItem.entityItemNew.content = component;
}

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

export function registerRoute(routePath: string, menuPath: string, title: string, component: React.ReactChild, entityName: string) {
  const Comp = observer((props: any) => {
    screens.currentRootPageData.title = title;
    useState(() => {
      routerData.history = props.history;
      routerData.location = props.location;
      routerData.match = props.matchl;

      const entityId = props?.match?.params?.entityId;
      if (entityId) {
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

    return <MultiScreen>{component}</MultiScreen>;
  });

  menuItems.push({
    pathPattern: routePath,
    menuLink: menuPath,
    component: Comp,
    caption: title,
  });
}
