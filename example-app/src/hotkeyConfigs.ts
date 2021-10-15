import {
  HotkeyConfig,
  screenHotkeysConfigs,
  browserHotkeysConfigs,
  editorHotkeysConfigs
} from "@amplicode/react-core";

export const defaultHotkeyConfigs: HotkeyConfig[] = [
  ...screenHotkeysConfigs,
  ...browserHotkeysConfigs,
  ...editorHotkeysConfigs
];
