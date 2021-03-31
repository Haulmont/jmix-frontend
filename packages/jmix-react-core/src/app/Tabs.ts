import { makeObservable, observable } from 'mobx';
import React from 'react';


export interface IMultiTabItem {
  title: string;
  content: React.ReactNode;
  key: string;
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
  closeAll = () => {
    this.tabs = [];
    this.currentTab = null!;
  };

  /**
   * Push tab
   * @param tab
   */
  push = (tab: IMultiTabItem) => {
    tab.key += '__' + this.tabsIndex++;
    this.currentTab = tab;

    this.tabs = [...this.tabs, tab];
  };

  /**
   * Close tab
   * @param tabToRemove
   */
  close = (tabToRemove: IMultiTabItem) => {
    const switchTab = this.currentTab === tabToRemove && this.tabs.length > 1;
    this.tabs = this.tabs.filter(tab => tab !== tabToRemove);
    if (switchTab) {
      this.currentTab = this.tabs[this.tabs.length - 1];
    }
  };

  /**
   * Set active tab
   * @param activeTab
   */
  setActiveTab = (activeTab: IMultiTabItem) => {
    this.currentTab = activeTab;
  };
}

/**
 * See {@link Tabs}
 */
export const tabs = new Tabs();
