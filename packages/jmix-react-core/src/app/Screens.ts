import {action, makeObservable, observable} from 'mobx';
import React, { useContext } from 'react';

export interface IMultiScreenProps {
  children?: React.ReactNode;
}

export interface IMultiScreenItem {
  title: string;
  content: React.ReactNode;
  parent?: IMultiScreenItem;
  params?: MultiScreenItemParams;
}

export interface MultiScreenItemParams {
  entityId?: string;
  pagination?: {
    page: number;
    pageSize: number;
  }
}

/**
 * Screens API
 */
export class Screens {
  props: IMultiScreenProps | undefined = undefined;
  currentRootPageData = {
    title: '',
    menuPath: '',
  };
  @observable.ref screens: IMultiScreenItem[] = [];
  @observable.ref currentScreen: IMultiScreenItem | undefined = undefined;

  constructor() {
    makeObservable(this);
  }

  setCurrentRootPageData(title: string, menuPath: string) {
    this.currentRootPageData = {
      title,
      menuPath
    };
  }

  /**
   * Return active screen content
   */
  get content() {
    const {screens: screensList, currentScreen, props} = this;
    if (screensList.length === 0) {
      return props?.children;
    }

    for (const screen of screensList) {
      if (screen === currentScreen) {
        return screen.content;
      }
    }

    return props?.children;
  }

  /**
   * Return current active screen index
   */
  get currentScreenIndex() {
    const {screens: screensList, currentScreen} = this;
    let index = 0;

    for (const screen of screensList) {
      if (screen === currentScreen) {
        return index;
      }

      index++;
    }

    return index;
  }

  /**
   * Close all screens
   */
  closeAll = action(() => {
    this.screens = [];
    this.currentScreen = undefined;
  });

  /**
   * Push screen
   * @param screenToPush
   */
  push = action((screenToPush: IMultiScreenItem) => {
    const lastScreen = this.screens[this.screens.length - 1] ?? null;
    let newScreens = [...this.screens];
    let parentScreen = null;

    if (newScreens.length > 0) {
      parentScreen = this.currentScreen;

      if (lastScreen !== this.currentScreen) {
        newScreens = [];
        for (const screen of this.screens) {
          newScreens.push(screen);

          if (screen === this.currentScreen) {
            break;
          }
        }
      }
    }

    screenToPush.parent = parentScreen!;

    this.currentScreen = screenToPush;
    newScreens.push(screenToPush);

    this.screens = newScreens;
  });

  /**
   * Set active screen
   * @param activeScreen
   * @param removeScreensToRight remove screens after active screen
   */
  setActiveScreen = action((
    activeScreen: IMultiScreenItem,
    removeScreensToRight = false,
  ) => {
    this.currentScreen = activeScreen;

    if (removeScreensToRight) {
      const newScreens = [];
      for (const screen of this.screens) {
        newScreens.push(screen);

        if (screen === this.currentScreen) {
          break;
        }
      }

      this.screens = newScreens;
    }

    window.history.pushState({}, '', this.getUrl());
  });

  getUrl(): string {
    const pagination = this.currentScreen?.params?.pagination;
    const entityId = this.currentScreen?.params?.entityId;

    let url = this.currentRootPageData?.menuPath;

    if (pagination) {
      url = (this.currentRootPageData.menuPath + `?page=${pagination.page}&pageSize=${pagination.pageSize}`);
    } else if (entityId) {
      url = (this.currentRootPageData.menuPath + `/${entityId}`);
    }

    return url;
  }
}

export const ScreensContext = React.createContext<Screens>(null!);

export function useScreens(): Screens {
  return useContext(ScreensContext);
}
