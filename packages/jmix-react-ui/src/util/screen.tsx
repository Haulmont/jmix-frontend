import {EntityInstance, MayHaveId, redirect, Screens, ScreensContext} from "@haulmont/jmix-react-core";
import {useCallback, useContext} from "react";
import {MultiScreenContext} from "../ui/MultiScreen";
import { IntlShape } from "react-intl";
import { message } from "antd";
import {openCrudScreen, ScreenNotFoundError} from "./componentsRegistration";

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
  intl: IntlShape;
}

export function openEntityEditorScreen<TEntity>({
  screens,
  entityName,
  entityIdToLoad,
  routingPath,
  onCommit,
  entityInstance,
  submitBtnCaption,
  hiddenAttributes,
  intl
}: EntityEditorScreenOptions<TEntity>) {
  try {
    if (entityIdToLoad != null && entityInstance != null) {
      console.warn('Both entityIdToLoad and entityInstance parameters are provided, entityInstance will take precedence.');
    }

    if (entityInstance != null) {
      // Entity instance is provided in parameters
      openCrudScreen({
        entityName,
        crudScreenType: 'entityEditor',
        screens,
        props: {
          onCommit,
          submitBtnCaption,
          entityInstance,
          hiddenAttributes
        }
      });
      return;
    }

    if (entityIdToLoad != null) {
      // Entity instance will be loaded from backend

      // If we are on root screen
      if (routingPath != null && screens.currentScreenIndex === 0) {
        redirect(`${routingPath}/${entityIdToLoad}`);
      }

      openCrudScreen({
        entityName,
        crudScreenType: 'entityEditor',
        screens,
        props: {
          onCommit,
          submitBtnCaption
        },
        screenParams: {
          entityId: entityIdToLoad
        }
      });
      return;
    }

    // Creating new entity - open empty editor.
    openCrudScreen({
      entityName,
      crudScreenType: 'entityEditor',
      screens,
      props: {
        onCommit,
        submitBtnCaption,
        hiddenAttributes
      }
    })

  } catch (e) {
    if (e instanceof ScreenNotFoundError) {
      // TODO use UI kit agnostic notification API
      message.error(intl.formatMessage(
        {id: 'editor.doesNotExist'},
        {entityName}
      ));
      return;
    }
    throw e;
  }
}

export interface EntityListScreenOptions {
  screens: Screens;
  entityName: string;
  entityList?: MayHaveId[];
  onEntityListChange?: (entityList: this['entityList']) => void;
  intl: IntlShape;
}

export function openEntityListScreen(
  {entityName, entityList, onEntityListChange, screens, intl}: EntityListScreenOptions
) {
  try {
    openCrudScreen({
      entityName,
      crudScreenType: 'entityList',
      screens,
      props: {
        entityList,
        onEntityListChange
      }
    });
  } catch (e) {
    if (e instanceof ScreenNotFoundError) {
      // TODO use UI kit agnostic notification API
      message.error(intl.formatMessage(
        {id: 'list.doesNotExist'},
        {entityName}
      ));
      return;
    }
    throw e;
  }
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
