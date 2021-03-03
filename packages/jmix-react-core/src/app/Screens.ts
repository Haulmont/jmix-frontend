import { observable } from 'mobx';
import React from 'react';

export interface IMultiScreenProps {
  children?: React.ReactNode;
}

export interface IMultiScreenItem {
  title: string;
  content: React.ReactNode;
  parent?: IMultiScreenItem;
  params?: {
    entityId?: string;
  };
}

export class Screens {
  props: IMultiScreenProps = null!;
  currentRootPageData = {
    title: '',
  };
  @observable.ref screens: IMultiScreenItem[] = [];
  @observable.ref currentScreen: IMultiScreenItem = null!;

  get content() {
    const {screens: screensList, currentScreen, props} = this;
    if (screensList.length === 0) {
      return props.children;
    }

    for (const screen of screensList) {
      if (screen === currentScreen) {
        return screen.content;
      }
    }

    return props.children;
  }

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

  closeAll = () => {
    this.screens = [];
    this.currentScreen = null!;
  };

  push = (screenToPush: IMultiScreenItem) => {
    const lastScreen = this.screens[this.screens.length - 1] ?? null;
    let newScreens = [...this.screens];
    let parentScreen = null;

    if (newScreens.length === 0) {
      const firstScreen = {
        title: this.currentRootPageData.title,
        content: this.props.children,
      };
      parentScreen = firstScreen;

      newScreens.push(firstScreen);
    } else {
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

    screenToPush.parent = parentScreen;

    this.currentScreen = screenToPush;
    newScreens.push(screenToPush);

    this.screens = [...newScreens];
  };

  setActiveScreen = (
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
  };
}

export const screens = new Screens();
