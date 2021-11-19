import {
  defaultBrowserTableHotkeyConfigs,
  defaultEditorHotkeyConfigs,
  defaultTabHotkeyConfigs,
  HotkeyConfig
} from "@haulmont/jmix-react-web";
import { hotkeyInfoHotkeyConfigs } from "./app/header/AppHeader";

export const defaultHotkeyConfigs: HotkeyConfig[] = [
  ...hotkeyInfoHotkeyConfigs,
  ...defaultTabHotkeyConfigs,
  ...defaultEditorHotkeyConfigs,
  ...defaultBrowserTableHotkeyConfigs
];
