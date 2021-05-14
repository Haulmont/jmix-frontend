import {redirect, Screens, MayHaveId} from "@haulmont/jmix-react-core";
import {referencesListByEntityName} from "./componentsRegistration";
import React, {ReactNode} from "react";

export interface EntityEditorScreenOptions {
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
  onCommit?: (entityInstance?: MayHaveId) => void;
  /**
   * Editor component will use provided entity instance.
   */
  entityInstance?: MayHaveId;
  /**
   * i18n key for submit button caption. Defaults to `common.submit`.
   */
  submitBtnCaption?: string;
}

export function openEntityEditorScreen({
  screens,
  entityName,
  entityIdToLoad,
  routingPath,
  onCommit,
  entityInstance,
  submitBtnCaption
}: EntityEditorScreenOptions) {
  const registeredReferral = referencesListByEntityName[entityName];

  if (entityIdToLoad != null && entityInstance != null) {
    console.warn('Both entityIdToLoad and entityInstance parameters are provided, entityInstance will take precedence.');
  }

  if (entityInstance != null) {
    // Entity instance is provided in parameters

    screens.push({
      title: registeredReferral.entityItemEdit.title,
      content: injectProps(registeredReferral.entityItemEdit.content, {onCommit, submitBtnCaption, entityInstance}),
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
    content: injectProps(registeredReferral.entityItemNew.content, {onCommit, submitBtnCaption})
  });
}

// export function openEntityBrowserScreen()

function injectProps<TProps = any>(component: ReactNode, props?: TProps) {
  if (props == null) {
    return component;
  }

  if (React.isValidElement(component)) {
    return React.cloneElement(component, props);
  }

  return component;
}
