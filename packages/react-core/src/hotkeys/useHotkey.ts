import hotkeys, { KeyHandler } from "hotkeys-js";
import { useEffect } from "react";
import { useHotkeyStore } from "./hotkeyContext";
import { useScreens } from "../screen-api/ScreenContext";
import { HotkeyConfig } from "./hotkeyConfig";
import { useScreenMeta } from "../screen-api/ScreenMetaContext";

export const useHotkey = (
  hotkeyConfig: HotkeyConfig,
  memoizedCallback: KeyHandler,
) => {
  const {addHotkeyConfig, removeHotkeyConfigs} = useHotkeyStore();

  useEffect(() => {
    addHotkeyConfig(hotkeyConfig);
    hotkeys(hotkeyConfig.pattern, memoizedCallback);

    return () => {
      hotkeys.unbind(hotkeyConfig.pattern, memoizedCallback);
      removeHotkeyConfigs(hotkeyConfig);
    };
  }, [
    hotkeyConfig,
    addHotkeyConfig,
    removeHotkeyConfigs,
    memoizedCallback,
  ]);
}

export const useScreenHotkey = (
  hotkeyConfig: HotkeyConfig,
  memoizedCallback: KeyHandler,
) => {
  const {addHotkeyConfig, removeHotkeyConfigs} = useHotkeyStore();
  const {activeTab, activeBreadcrumb} = useScreens();
  const {tabKey, breadcrumbKey} = useScreenMeta();
  
  useEffect(() => {
    if (activeTab?.key === tabKey && activeBreadcrumb?.key === breadcrumbKey) {
      hotkeys(hotkeyConfig.pattern, memoizedCallback);
      addHotkeyConfig(hotkeyConfig);
    }

    return () => {
      if (activeTab?.key === tabKey && activeBreadcrumb?.key === breadcrumbKey) {
        hotkeys.unbind(hotkeyConfig.pattern, memoizedCallback);
        removeHotkeyConfigs(hotkeyConfig);
      }
    };
  }, [
    tabKey,
    activeTab?.key,
    breadcrumbKey,
    activeBreadcrumb?.key,
    hotkeyConfig,
    addHotkeyConfig,
    removeHotkeyConfigs,
    memoizedCallback,
  ]);
}
