import hotkeys, { KeyHandler } from "hotkeys-js";
import { useEffect, useState } from "react";
import { reaction } from 'mobx';
import { useHotkeyStore } from "./hotkeyContext";
import { HotkeyConfig } from "./hotkeyConfig";
import { useMultiScreen } from "../ui/MultiScreen/MultiScreen";
import { tabs, useScreens } from "@haulmont/jmix-react-core";

export const useHotkey = (
  hotkeyConfig: HotkeyConfig,
  memoizedCallback: KeyHandler,
) => {
  const {addHotkeyConfig, removeHotkeyConfigs} = useHotkeyStore();

  useEffect(() => {
    addHotkeyConfig(hotkeyConfig);
    hotkeys(hotkeyConfig.hotkey, memoizedCallback);

    return () => {
      hotkeys.unbind(hotkeyConfig.hotkey, memoizedCallback);
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
  const multiScreen = useMultiScreen();
  const screens = useScreens();
 
  const isScreen = multiScreen != null && screens != null;

  const [currentTab, setCurrentTab] = useState(tabs.currentTab);

  const parentScreenIsSelected = (
    isScreen
    && currentTab?.title === multiScreen.title
    && screens?.currentScreen?.title === multiScreen.title
  );

  const childScreenIsSelected = (
    isScreen
    && currentTab?.title === multiScreen.parent?.title
    && screens?.currentScreen?.title === multiScreen.title
  );

  useEffect(() => {
    if (!isScreen) {
      console.error('useScreenHotkey hook should be used inside the screen-api');
    }
  }, [isScreen])

  useEffect(() => {
    if (parentScreenIsSelected || childScreenIsSelected) {
      hotkeys(hotkeyConfig.hotkey, memoizedCallback);
      addHotkeyConfig(hotkeyConfig);
    }

    return () => {
      if (parentScreenIsSelected || childScreenIsSelected) {
        hotkeys.unbind(hotkeyConfig.hotkey, memoizedCallback);
        removeHotkeyConfigs(hotkeyConfig);
      }
    };
  }, [
    hotkeyConfig,
    childScreenIsSelected,
    parentScreenIsSelected,
    addHotkeyConfig,
    removeHotkeyConfigs,
    memoizedCallback,
  ]);

  useEffect(() => {
    const dispose = reaction(
      () => tabs.currentTab,
      setCurrentTab,
    );
    return dispose;
  }, []);
}
