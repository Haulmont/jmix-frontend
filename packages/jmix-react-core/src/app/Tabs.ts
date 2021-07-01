import { action, makeObservable, observable, reaction } from 'mobx';
import React from 'react';
import { Screens } from './Screens';
import { redirect } from './Router';

export interface IMultiTabItem {
  title: string;
  content: React.ReactNode;
  rootScreenId: string;
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

  constructor() {
    makeObservable(this);

    reaction(
      () => [this.currentTab],
      () => {
        const {screensInTab} = this.currentTab;
        const url = screensInTab?.getUrl();
        if (url != null) {
          redirect(url);
        }
      }
    );

    reaction(
      () => [this.tabs.length],
      () => {
        if (this.tabs.length === 0) {
          redirect('/');
        }
      }
    );
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
      const updatedCurrentTabIndex = removedTabIndex === 0 
        ? 0
        : removedTabIndex - 1

      this.currentTab = this.tabs[updatedCurrentTabIndex];
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

  /**
   * {@link push}es the tab unless there is already a tab with same `rootScreenId`, in which case
   * that tab will be activated.
   */
  pushOrActivate = action((tab: IMultiTabItem) => {
    const tabIndex = this.tabs.findIndex(t => t.rootScreenId === tab.rootScreenId);

    if (tabIndex > -1) {
      // Tab already opened
      this.setActiveTab(this.tabs[tabIndex]);
      return;
    }

    // Open in a new tab
    this.push(tab);
  });
}

/**
 * See {@link Tabs}
 */
export const tabs = new Tabs();
