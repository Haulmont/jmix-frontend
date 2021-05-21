import {EntityInstance, MayHaveId, redirect, Screens, ScreensContext} from "@haulmont/jmix-react-core";
import {referencesListByEntityName} from "./componentsRegistration";
import React, {ReactNode, useCallback, useContext} from "react";
import {MultiScreenContext} from "../ui/MultiScreen";

export interface EntityEditorScreenOptions<TEntity> {
  screens: Screens;
  entityName: string;
  /**
   * Editor component will load an entity with a given id from backend.
   * Won't take effect if {@link entityInstance} parameter is also provided.
   */
  entityIdToLoad?: string;
  routingPath?: string;
  /**
   * Callback that will be executed when the editor is committed (submit button is clicked).
   * If omitted, the default behavior is to persist an entity at the backend.
   *
   * @param entityInstance
   */
  onCommit?: (entityInstance?: this['entityInstance']) => void;
  /**
   * Editor component will use provided entity instance.
   */
  entityInstance?: EntityInstance<TEntity>;
  /**
   * i18n key for submit button caption. Defaults to `common.submit`.
   */
  submitBtnCaption?: string;
  hiddenAttributes?: string[];
}

export function openEntityEditorScreen<TEntity>({
  screens,
  entityName,
  entityIdToLoad,
  routingPath,
  onCommit,
  entityInstance,
  submitBtnCaption,
  hiddenAttributes
}: EntityEditorScreenOptions<TEntity>) {
  const registeredReferral = referencesListByEntityName[entityName];

  if (entityIdToLoad != null && entityInstance != null) {
    console.warn('Both entityIdToLoad and entityInstance parameters are provided, entityInstance will take precedence.');
  }

  if (entityInstance != null) {
    // Entity instance is provided in parameters

    screens.push({
      title: registeredReferral.entityItemEdit.title,
      content: injectProps(registeredReferral.entityItemEdit.content, {
        onCommit,
        submitBtnCaption,
        entityInstance,
        hiddenAttributes
      }),
    });

    return;
  }

  if (entityIdToLoad != null) {
    // Entity instance will be loaded from backend

    // If we are on root screen
    if (routingPath != null && screens.currentScreenIndex === 0) {
      redirect(`${routingPath}/${entityIdToLoad}`);
    }

    screens.push({
      title: registeredReferral.entityItemEdit.title,
      content: injectProps(registeredReferral.entityItemEdit.content, {onCommit, submitBtnCaption}),
      params: {
        entityId: entityIdToLoad
      }
    });

    return;
  }

  // Creating new entity - open empty editor.
  screens.push({
    title: registeredReferral.entityItemNew.title,
    content: injectProps(registeredReferral.entityItemNew.content, {
      onCommit,
      submitBtnCaption,
      hiddenAttributes
    })
  });
}

export interface EntityListScreenOptions {
  screens: Screens;
  entityName: string;
  entityList?: MayHaveId[];
  onEntityListChange?: (entityList: this['entityList']) => void;
  reverseAttrName?: string;
}

export function openEntityListScreen(
  {entityName, entityList, onEntityListChange, screens, reverseAttrName}: EntityListScreenOptions
) {
  const registeredReferral = referencesListByEntityName[entityName];

  screens.push({
    title: registeredReferral.entityList.title,
    content: injectProps(registeredReferral.entityList.content, {
      entityList,
      onEntityListChange,
      reverseAttrName,
    }),
  });
}

export const useParentScreen = (routingPath: string): (() => void) => {
  const screens = useContext(ScreensContext);
  const multiScreen = useContext(MultiScreenContext);

  return useCallback(() => {
    if (screens.currentScreenIndex === 1) {
      redirect(routingPath);
    }
    screens.setActiveScreen(multiScreen.parent!, true);
  }, [screens, routingPath, multiScreen]);
};

function injectProps<TProps = any>(component: ReactNode, props?: TProps) {
  if (props == null) {
    return component;
  }

  if (React.isValidElement(component)) {
    return React.cloneElement(component, props);
  }

  return component;
}
