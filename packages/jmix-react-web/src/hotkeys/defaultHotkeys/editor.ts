import { HotkeyConfig } from "../hotkeyConfig";
import { useScreenHotkey } from "../useHotkey";

const EDITOR_CATEGORY_NAME = 'hotkeys.editor.categoryName';

const saveEntityHotkeyConfig: HotkeyConfig = {
  categoryName: EDITOR_CATEGORY_NAME ,
  description: 'hotkeys.editor.saveEntity',
  hotkey: 's',
}

export const defaultEditorHotkeyConfigs: HotkeyConfig[] = [
  saveEntityHotkeyConfig,
];

interface EditorHotkeysHookOptions {
  saveEntity: () => void;
}
export const useDefaultEditorHotkeys = ({saveEntity}: EditorHotkeysHookOptions) => {
  useScreenHotkey(saveEntityHotkeyConfig, saveEntity);
}
