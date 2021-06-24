import { action, makeObservable, observable, reaction } from 'mobx';
import React from 'react';
import { Screens } from './Screens';
import { redirect } from './Router';


export interface IMultiTabItem {
  title: string;
  content: React.ReactNode;
  key: string;
  screensInTab?: Screens;
}

/**
 * Tabs API
 */
export class Tabs {
  @observable.ref tabs: IMultiTabItem[] = [];
  @observable.ref currentTab: IMultiTabItem = null!;
  tabsIndex = 0;
  homePage: React.ReactNode = null;

  constructor() {
    makeObservable(this);

    // Update route url when tabs are changed
    reaction(() => [ this.currentTab ], () => {
      const screensInTab = this.currentTab.screensInTab;
      if (screensInTab) {
        updateUrl(screensInTab);
      }
    });
    reaction(() => [ this.tabs.length ], () => {
      if (this.tabs.length === 0) {
        redirect('/');
      }
    });
  }

  /**
   * Return current active tab index
   */
  get currentTabIndex() {
    const {tabs: tabsList, currentTab} = this;
    let index = 0;

    for (const screen of tabsList) {
      if (screen === currentTab) {
        return index;
      }

      index++;
    }

    return index;
  }

  /**
   * Close all tabs
   */
  closeAll = action(() => {
    this.tabs = [];
    this.currentTab = null!;
  });

  /**
   * Push tab
   * @param tab
   */
  push = action((tab: IMultiTabItem) => {
    tab.key += '__' + this.tabsIndex++;
    this.currentTab = tab;

    this.tabs = [...this.tabs, tab];

    window.scrollTo(0, 0);
  });

  /**
   * Close tab
   * @param tabToRemove
   */
  close = action((tabToRemove: IMultiTabItem) => {
    const switchTab = this.currentTab === tabToRemove && this.tabs.length > 1;
    const removedTabIndex = this.tabs.indexOf(tabToRemove);
    this.tabs = this.tabs.filter(tab => tab !== tabToRemove);
    if (switchTab) {
      this.currentTab = this.tabs[removedTabIndex - 1];
    }
  });

  /**
   * Set active tab
   * @param activeTab
   */
  setActiveTab = action((activeTab: IMultiTabItem) => {
    this.currentTab = activeTab;

    window.scrollTo(0, 0);
  });
}

function updateUrl(screens: Screens) {
  let url = screens.currentRootPageData.menuPath;
  if (screens.screens.length > 1) {
    const secondScreen = screens.screens[1];
    if (secondScreen.params?.entityId) {
      url += '/' + secondScreen.params?.entityId;
    }
  }

  redirect(url);
}

/**
 * See {@link Tabs}
 */
export const tabs = new Tabs();
