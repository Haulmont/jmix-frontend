import { tabs } from "@haulmont/jmix-react-core";
import { KeyHandler } from "hotkeys-js";
import { useCallback } from "react";
import { HotkeyConfig } from "../hotkeyConfig";
import { useHotkey } from "../useHotkey";

const TABS_CATEGORY_NAME = 'hotkeys.tabs.categoryName';

const nextTabHotkeyConfig: HotkeyConfig = {
  categoryName: TABS_CATEGORY_NAME,
  description: "hotkeys.tabs.nextTab",
  hotkey: "right",
}

const previousTabHotkeyConfig: HotkeyConfig = {
  categoryName: TABS_CATEGORY_NAME,
  description: "hotkeys.tabs.previousTab",
  hotkey: "left",
}

export const defaultTabHotkeyConfigs: HotkeyConfig[] = [
  nextTabHotkeyConfig,
  previousTabHotkeyConfig,
];

export const useDefaultTabHotkeys = () => {
  const nextTab = useCallback<KeyHandler>(() => {
    if (tabs.tabs[tabs.currentTabIndex + 1] != null) {
      tabs.setActiveTab(tabs.tabs[tabs.currentTabIndex + 1]);
    }
  }, []);
  useHotkey(nextTabHotkeyConfig, nextTab);

  const previousTab = useCallback<KeyHandler>(() => {
    if (tabs.tabs[tabs.currentTabIndex - 1] != null) {
      tabs.setActiveTab(tabs.tabs[tabs.currentTabIndex - 1]);
    }
  }, []);
  useHotkey(previousTabHotkeyConfig, previousTab);
}
