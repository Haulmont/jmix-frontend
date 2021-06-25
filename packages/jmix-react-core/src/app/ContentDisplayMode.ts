/**
 * Defines how screens shall be displayed in the {@link ContentArea}.
 */
export enum ContentDisplayMode {
  /**
   * A screen shall always be opened in a new tab.
   */
  AlwaysNewTab = 'AlwaysNewTab',
  /**
   * A screen shall be opened in a new tab unless there is already a tab with this screen,
   * in which case said tab will become active.
   */
  ActivateExistingTab = 'ActivateExistingTab',
  /**
   * No tabs, only a single screen will be displayed at a time,
   * opening a screen will replace the previously opened screen.
   */
  NoTabs = 'NoTabs',
}