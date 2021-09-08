import {
  getMenuItems,
  assertNever,
  ReactComponent,
  Screens,
  MultiScreenItemParams,
  tabs,
  redirect,
  useScreens,
  getMainStore,
  MainStore,
  ContentDisplayMode
} from '@haulmont/jmix-react-core';
import React, { useEffect } from 'react';
import {observer} from "mobx-react";
import {MultiScreen} from "../ui/MultiScreen";
import {entityEditorRegistry, entityListRegistry, screenRegistry } from './registry';
import {singleContentArea} from "../ui/single-content-area/SingleContentAreaState";

export class ScreenNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ScreenNotFoundError';
  }
}

export const menuItems = getMenuItems();

export const routerData = {
  history: null as any,
  location: null as any,
  match: null as any,
};

export interface RegisteredScreen {
  caption: string;
  component: ReactComponent;
}

/**
 * Opens a registered screen.
 * Example of usage: navigating the menu.
 * Exact behavior (e.g. open in a new tab, replace existing opened screen)
 * depends on {@link MainStore.contentDisplayMode} setting.
 *
 * @param screenId
 * @param route
 *
 * @throws ScreenNotFoundError if a screen with given {@link screenId} is not found
 */
export function openScreen(screenId: string, route: string) {
  const screen = getScreen(screenId);

  const mainStore: MainStore = getMainStore();

  switch (mainStore.contentDisplayMode) {
    case ContentDisplayMode.ActivateExistingTab:
      tabs.pushOrActivate({
        title: screen.caption,
        content: (
          <MultiScreenWrapper screen={screen}
                              menuLink={route}
          />
        ),
        key: route,
        rootScreenId: screenId
      });
      break;
    case ContentDisplayMode.AlwaysNewTab:
      tabs.push({
        title: screen.caption,
        content: (
          <MultiScreenWrapper screen={screen}
                              menuLink={route}
          />
        ),
        key: route,
        rootScreenId: screenId
      });
      break;
    case ContentDisplayMode.NoTabs:
      singleContentArea.activateScreen(screenId, (
        <MultiScreenWrapper screen={screen}
                            menuLink={route}
                            replace={true}
        />
      ));
      break;
    default:
      assertNever('MainStore.contentDisplayMode', mainStore.contentDisplayMode);
  }

  redirect(route);
}

export interface OpenCrudScreenOptions<TProps = any> {
  entityName: string;
  crudScreenType: 'entityEditor' | 'entityList';
  screens: Screens;
  props?: TProps;
  screenParams?: MultiScreenItemParams;
}

/**
 * Opens a registered CRUD screen (entity list or editor) for a given entity
 * within an existing {@link MultiScreen}. Example of usage: opening a child entity editor when
 * editing a Composition attribute in parent entity.
 *
 * @throws ScreenNotFoundError if a CRUD screen for given entity is not found
 * @param options
 */
export function openCrudScreen<TProps = any>(options: OpenCrudScreenOptions<TProps>) {
  const {
    entityName,
    crudScreenType,
    screens,
    props,
    screenParams
  } = options;

  const screen = getCrudScreen(entityName, crudScreenType);
  pushToScreens<TProps>(screen, screens, props, screenParams);
}

function pushToScreens<TProps = any>(screen: RegisteredScreen, screens: Screens, props?: TProps, screenParams?: MultiScreenItemParams) {
  screens.push({
    title: screen.caption,
    content: createScreenElement<TProps>(screen, props),
    params: screenParams,
    key: generateKey()
  });
}

function generateKey(): string {
  return String(window.crypto.getRandomValues(new Uint32Array(1))[0]);
}

function createScreenElement<TProps = any>(screen: RegisteredScreen, props?: TProps) {
  return React.createElement(screen.component, props);
}

function getScreen(screenId: string): RegisteredScreen {
  const screen = screenRegistry.get(screenId);
  if (screen == null) {
    throw new ScreenNotFoundError(`Registered screen with id "${screenId}" was not found`);
  }
  return screen;
}

function getCrudScreen(entityName: string, crudScreenType: 'entityEditor' | 'entityList'): RegisteredScreen {
  let crudScreenRegistry: Map<string, string>;
  switch (crudScreenType) {
    case 'entityEditor': {
      crudScreenRegistry = entityEditorRegistry;
      break;
    }
    case 'entityList': {
      crudScreenRegistry = entityListRegistry;
      break;
    }
    default: {
      assertNever('crudScreenType', crudScreenType);
    }
  }

  const screenId = crudScreenRegistry.get(entityName);
  if (screenId == null) {
    throw new ScreenNotFoundError(`Registered CRUD screen from entity "${entityName}" was not found`);
  }
  return getScreen(screenId);
}

export interface ScreenRegistrationOptions {
  /**
   * Screen component.
   */
  component: ReactComponent;
  /**
   * Caption for menu item and tab.
   */
  caption: string;
  /**
   * Unique identifier for a screen.
   */
  screenId: string;
  menuOptions?: MenuRegistrationOptions;
}

export interface MenuRegistrationOptions {
  pathPattern: string;
  menuLink: string;
}

export function registerScreen(options: ScreenRegistrationOptions) {
  const {
    component,
    caption,
    screenId,
    menuOptions,
  } = options;

  screenRegistry.set(screenId, {
    caption,
    component
  });

  if (menuOptions != null) {
    registerMenuItem({
      screenId,
      caption,
      ...menuOptions
    });
  }
}

export interface CrudScreenRegistrationOptions extends ScreenRegistrationOptions {
  entityName: string;
}

export function registerEntityEditor(options: CrudScreenRegistrationOptions) {
  const { entityName, screenId } = options;
  registerScreen(options);
  entityEditorRegistry.set(entityName, screenId);
}

export function registerEntityList(options: CrudScreenRegistrationOptions) {
  const { entityName, screenId } = options;
  registerScreen(options);
  entityListRegistry.set(entityName, screenId);
}

interface MenuItemOptions {
  caption: string;
  pathPattern: string;
  menuLink: string;
  screenId: string;
}

function registerMenuItem(options: MenuItemOptions) {
  getMenuItems().push(options);
}

interface MultiScreenWrapperProps {
  screen: RegisteredScreen;
  menuLink: string;
  replace?: boolean;
}

const MultiScreenWrapper = observer((props: MultiScreenWrapperProps) => {
  const {screen, menuLink, replace} = props;
  const screens = useScreens();

  screens.currentRootPageData.title = screen.caption;
  screens.currentRootPageData.menuPath = menuLink;

  useEffect(() => {
    // Since ScreensContext is not available within `openScreen` method,
    // we have to push the screen from here.
    // TODO Is there a better way?
    if (replace) {
      screens.closeAll();
    }
    pushToScreens(screen, screens);
  }, [screen, screens, replace]);

  return <MultiScreen />;
});
