import {
  getMenuItems,
  assertNever,
  ReactComponent,
  Screens,
  MultiScreenItemParams,
  tabs,
  redirect,
  useScreens,
} from '@haulmont/jmix-react-core';
import React, { useEffect } from 'react';
import {observer} from "mobx-react";
import {MultiScreen} from "../ui/MultiScreen";
import {entityEditorRegistry, entityListRegistry, screenRegistry } from './registry';

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
 * Opens a registered screen in a new tab.
 * Example of usage: navigating the menu.
 *
 * @param screenId
 * @param menuLink
 *
 * @throws ScreenNotFoundError if a screen with given {@link screenId} is not found
 */
export function openScreenInTab(screenId: string, menuLink: string) {
  const screen = getScreen(screenId);

  tabs.push({
    title: screen.caption,
    content: <MultiScreenWrapper screen={screen}
                                 menuLink={menuLink}
             />,
    key: menuLink.substr(1)
  });
  redirect(menuLink);
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
 * within an existing tab. Example of usage: opening a child entity editor when
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
    params: screenParams
  });
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
}

const MultiScreenWrapper = observer((props: MultiScreenWrapperProps) => {
  const {screen, menuLink} = props;
  const screens = useScreens();

  screens.currentRootPageData.title = screen.caption;
  screens.currentRootPageData.menuPath = menuLink;

  useEffect(() => {
    // Since ScreensContext is not available within `openScreenInTab` method,
    // we have to push the screen from here.
    // TODO Is there a better way?
    pushToScreens(screen, screens);
  }, []);

  return <MultiScreen />;
});
