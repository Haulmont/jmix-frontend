import { ReactComponent } from "./ReactComponent";
import { action, computed, makeObservable, observable, reaction } from "mobx";
import React, { ReactNode } from "react";
import { generateKey } from "../util/generateKey";
import { getScreenKey } from "./getScreenKey";
import { defaultGetPageTitle } from "./defaultGetPageTitle";

export interface OpenInBreadcrumbParams {
  breadcrumbCaption: string;
  component: ReactComponent;
  props?: any;
}

export interface OpenInTabParams extends OpenInBreadcrumbParams {
  tabCaption: string;
  tabKey: string;
}

export interface TabState {
  breadcrumbs: BreadcrumbState[];
  activeBreadcrumbIndex?: number;
  caption: string;
  key: string;
  route: string;
}

export interface BreadcrumbState {
  content: ReactNode;
  caption: string;
  key: string;
}

export interface ScreensConfig {
  getPageTitle?: (tabCaption?: string, breadcrumbCaption?: string) => string;
}

export class Screens {
  private _tabs: TabState[] = [];
  private _activeTabIndex?: number;

  readonly appTitle: string;

  get tabs() {
    return this._tabs;
  }

  get activeTab() {
    if (this._activeTabIndex == null) {
      return undefined;
    }
    return this._tabs[this._activeTabIndex];
  }

  get activeBreadcrumb() {
    if (this.activeTab?.activeBreadcrumbIndex == null) {
      return undefined;
    }
    return this.activeTab.breadcrumbs[this.activeTab.activeBreadcrumbIndex];
  }

  get activeContent() {
    return this.activeBreadcrumb?.content;
  }

  constructor(private config?: ScreensConfig) {
    makeObservable<Screens, "_tabs" | "_activeTabIndex">(this, {
      _tabs: observable,
      _activeTabIndex: observable,
      tabs: computed,
      activeTab: computed,
      activeBreadcrumb: computed,
      activeContent: computed,
      openInTab: action,
      openInBreadcrumb: action,
      makeTabActive: action,
      makeTabActiveByIndex: action,
      makeBreadcrumbActive: action,
      closeTab: action,
      closeBreadcrumb: action,
      closeActiveBreadcrumb: action
    });

    this.appTitle = document.title;

    /**
     * This will trigger when URL is changed in the running app,
     * either manually in the browser address bar,
     * or programmatically by a component inside the tab,
     * or Screen API itself.
     *
     * This will not trigger when an app is first opened using a deep link.
     *
     * See {@link this.saveTabUrl} for details.
     */
    window.addEventListener("hashchange", this.saveTabUrl);

    reaction(
      () => [this.activeTab, this.activeBreadcrumb],
      this.updatePageTitle
    );
  }

  openInTab = (params: OpenInTabParams) => {
    const { tabCaption, breadcrumbCaption, component, props, tabKey } = params;

    if (this._tabs.some(t => t.key === tabKey)) {
      // Tab with given key already exists so we just activate it
      this.makeTabActive(tabKey);
    } else {
      // We create a new tab and activate it
      const newTab: TabState = {
        breadcrumbs: [],
        caption: tabCaption,
        key: tabKey,
        route: tabKey
      };
      this._tabs.push(newTab);
      this.makeTabActiveByIndex(this._tabs.length - 1);
      this.openInBreadcrumb({
        component,
        props,
        breadcrumbCaption
      });
    }
  };

  openInBreadcrumb = (params: OpenInBreadcrumbParams) => {
    const { breadcrumbCaption, component, props } = params;

    if (this.activeTab == null) {
      throw new Error("No active tab found");
    }

    this.activeTab.breadcrumbs.push({
      caption: breadcrumbCaption,
      content: React.createElement(component, props),
      key: generateKey()
    });
    this.activeTab.activeBreadcrumbIndex =
      this.activeTab.breadcrumbs.length - 1;
  };

  makeTabActive = (key: string) => {
    this.makeTabActiveByIndex(this._tabs.findIndex(t => t.key === key));
  };

  makeTabActiveByIndex = (index: number) => {
    this._activeTabIndex = index;
    this.onActiveTabChange();
  };

  makeBreadcrumbActive = (key: string) => {
    if (this.activeTab == null) {
      return;
    }
    this.activeTab.activeBreadcrumbIndex = this.activeTab.breadcrumbs.findIndex(
      b => b.key === key
    );
  };

  closeTab = (key: string) => {
    const closedTabIndex = this._tabs.findIndex(t => t.key === key);
    this._tabs = this._tabs.filter(t => t.key !== key);

    this.makeTabActiveAfterClose(closedTabIndex);
    this.onActiveTabChange();
  };

  closeAllTabs = () => {
    this._tabs = [];
    this._activeTabIndex = undefined;
    this.onActiveTabChange();
  };

  closeBreadcrumb = (key: string) => {
    if (this.activeTab == null) {
      return;
    }
    this.activeTab.breadcrumbs = this.activeTab.breadcrumbs.filter(
      b => b.key !== key
    );
  };

  closeActiveBreadcrumb = () => {
    if (this.activeTab == null) {
      return;
    }
    this.activeTab.breadcrumbs = this.activeTab?.breadcrumbs.slice(
      0,
      this.activeTab?.activeBreadcrumbIndex
    );
    this.activeTab.activeBreadcrumbIndex =
      this.activeTab.breadcrumbs.length - 1;
  };

  private updatePageTitle = () => {
    const getPageTitle =
      this.config?.getPageTitle ??
      defaultGetPageTitle.bind(null, this.appTitle);
    document.title = getPageTitle(
      this.activeTab?.caption,
      this.activeBreadcrumb?.caption
    );
  };

  private onActiveTabChange() {
    if (this.activeTab == null) {
      // We have closed all tabs
      // Clear the URL.
      window.location.hash = "/";
      return;
    }
    if (getScreenKey(window.location.hash) !== this.activeTab?.key) {
      // We have navigated from one tab to another, or opened the first tab.
      // We now need to update the URL.
      window.location.hash = "/" + this.activeTab.route;
      /**
       * This will trigger 'hashchange' and subsequently {@link this.saveTabUrl},
       * but the latter will do nothing since the saved route fully matches the hash.
       */
      return;
    }

    /**
     * We have opened an app using a deep link.
     * Now we need to save the URL in tab state object (see {@link this.saveTabUrl} for details).
     */
    this.saveTabUrl();
  }

  /**
   * URL for a screen in a tab will always start with a tab key, e.g. "owner-list".
   * However, it might be followed by other elements:
   * nested routes ("pet-list/12345678"), query parameters ("pet-list?page=1&pageSize=20").
   * Screen API doesn't deal with these additional elements,
   * it only renders a component that corresponds to the key "pet-list",
   * everything else is responsibility of that component.
   *
   * However, we need to save the URL in the tab state object, so that when we navigate
   * to another tab and then back, we can restore the correct URL.
   *
   * Let's consider the following use cases.
   *
   * 1) URL is changed by Screen API.
   * It this case this function is invoked by 'hashchange' event listener,
   * but it will do nothing, since the URL hash fully matches the activeTab.route.
   *
   * 2) URL is changed in the running app, either manually in the browser address bar
   * or programmatically by a component inside the tab - but not by Screen API.
   * It this case this function is invoked by 'hashchange' event listener,
   * and it will save the new URL into activeTab.route.
   *
   * 3) We open an app by pasting a deep link into the browser address bar.
   * In this case this function is invoked from {@link this.onActiveTabChange},
   * and it will save the new URL into activeTab.route.
   *
   * @private
   */
  private saveTabUrl() {
    if (this.activeTab == null) {
      return;
    }
    const route = window.location.hash.split("#/")[1];
    if (route !== this.activeTab?.route) {
      this.activeTab.route = route;
    }
  }

  /**
   * Determines whether the active tab index should be changed after some tab has been closed.
   * @param closedTabIndex
   * @private
   */
  private makeTabActiveAfterClose(closedTabIndex: number) {
    if (this._activeTabIndex == null) {
      console.warn(
        `Expected valid tab index but found ${this._activeTabIndex}`
      );
      return;
    }

    if (this._tabs.length === 0) {
      // There was only a single tab and we have closed it. All tabs are closed now. There is no active tab.
      this._activeTabIndex = undefined;
      return;
    }

    if (closedTabIndex === this._activeTabIndex) {
      // We have closed the active tab. Make the rightmost tab active.
      this._activeTabIndex = this._tabs.length - 1;
      return;
    }

    // We have closed an inactive tab.
    if (closedTabIndex > this._activeTabIndex) {
      // Closed tab was to the right of the active tab. Active tab index remains correct.
      return;
    }
    if (closedTabIndex < this._activeTabIndex) {
      // Closed tab was to the left of the active tab. Active tab index is now off by one.
      this._activeTabIndex = this._activeTabIndex - 1;
    }
  }
}
