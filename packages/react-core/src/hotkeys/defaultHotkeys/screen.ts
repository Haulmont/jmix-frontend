import { KeyHandler } from "hotkeys-js";
import { useCallback } from "react";
import { useScreens } from "../../screen-api/ScreenContext";
import { useHotkey } from "../useHotkey";
import { HotkeyConfig } from "../hotkeyConfig";

const SCREEN_HOTKEYS_CATEGORY_NAME = 'hotkeys.category.screen';

export const nextTabHotkeyConfig: HotkeyConfig = {
  pattern: 'right',
  description: 'hotkeys.screen.nextTab',
  categoryName: SCREEN_HOTKEYS_CATEGORY_NAME,
};

export const previousTabHotkeyConfig: HotkeyConfig = {
  pattern: 'left',
  description: 'hotkeys.screen.previousTab',
  categoryName: SCREEN_HOTKEYS_CATEGORY_NAME,
};


export const screenHotkeysConfigs: HotkeyConfig[] = [
  nextTabHotkeyConfig,
  previousTabHotkeyConfig,
];

export const useDefaultScreenHotkeys = () => {
  const screens = useScreens();

  const nextTab = useCallback<KeyHandler>(() => {
    const currentTab = screens.activeTab
    if (currentTab) {
      const currentTabIndex = screens.tabs.indexOf(currentTab);
  
      if (currentTabIndex + 1 < screens.tabs.length) {
        screens.makeTabActiveByIndex(currentTabIndex + 1);
      }
    }
  }, [screens]);
  useHotkey(nextTabHotkeyConfig, nextTab)

  const previousTab = useCallback<KeyHandler>(() => {
    const currentTab = screens.activeTab
    if (currentTab) {
      const currentTabIndex = screens.tabs.indexOf(currentTab)
  
      if (currentTabIndex -1 >= 0) {
        screens.makeTabActiveByIndex(currentTabIndex - 1);
      }
    }
  }, [screens]);
  useHotkey(previousTabHotkeyConfig, previousTab)
}