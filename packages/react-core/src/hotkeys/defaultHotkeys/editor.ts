import { useScreenHotkey } from "../useHotkey";
import { HotkeyConfig } from "../hotkeyConfig";

const EDITOR_HOTKEYS_CATEGORY_NAME = 'hotkeys.category.editor';

export const saveEntityHotkeysConfig: HotkeyConfig = {
  pattern: 's',
  description: 'hotkeys.editor.saveEntity',
  categoryName: EDITOR_HOTKEYS_CATEGORY_NAME,
}

export const editorHotkeysConfigs: HotkeyConfig[] = [
  saveEntityHotkeysConfig,
];

interface EditorHotkeysHook {
  saveEntity: () => void;
}
export const useDefaultEditorHotkeys = ({saveEntity}: EditorHotkeysHook) => {
  useScreenHotkey(saveEntityHotkeysConfig, saveEntity);
}