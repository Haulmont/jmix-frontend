import { useCallback } from "react";
import { useScreenHotkey } from "../useHotkey";
import { HotkeyConfig } from "../hotkeyConfig";
import { KeyHandler } from "hotkeys-js";

const BROWSER_HOTKEYS_CATEGORY_NAME = 'hotkeys.category.browser';

export const applyFilterHotkeyConfig: HotkeyConfig = {
  pattern: 'f',
  description: 'hotkeys.browser.applyFilter',
  categoryName: BROWSER_HOTKEYS_CATEGORY_NAME,
}

export const browserHotkeysConfigs: HotkeyConfig[] = [
  applyFilterHotkeyConfig,
];

export const useDefaultBrowserHotkeys = () => {
  const applyFilter = useCallback<KeyHandler>(() => {
    // TODO Write the implementation when the functionality with filters will be implemented
    // eslint-disable-next-line no-console
    console.log('applyFilter hotkey');
  }, []);
  useScreenHotkey(applyFilterHotkeyConfig, applyFilter);
}