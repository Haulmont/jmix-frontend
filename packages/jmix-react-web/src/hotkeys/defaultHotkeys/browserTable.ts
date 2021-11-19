import { KeyHandler } from "hotkeys-js";
import { useCallback } from "react";
import { HotkeyConfig } from "../hotkeyConfig";
import { useScreenHotkey } from "../useHotkey";

const BROWSER_TABLE_CATEGORY_NAME = 'hotkeys.browserTable.categoryName';

const editEntityHotkeyConfig: HotkeyConfig = {
  categoryName: BROWSER_TABLE_CATEGORY_NAME,
  description: 'hotkeys.browserTable.editEntity',
  hotkey: 'g+e',
};

const createEntityHotkeyConfig: HotkeyConfig = {
  categoryName: BROWSER_TABLE_CATEGORY_NAME,
  description: 'hotkeys.browserTable.createEntity',
  hotkey: 'g+c',
};

const deleteEntityHotkeyConfig: HotkeyConfig = {
  categoryName: BROWSER_TABLE_CATEGORY_NAME,
  description: 'hotkeys.browserTable.deleteEntity',
  hotkey: 'd',
};

export const defaultBrowserTableHotkeyConfigs: HotkeyConfig[] = [
  editEntityHotkeyConfig,
  createEntityHotkeyConfig,
  deleteEntityHotkeyConfig,
];

interface BrowserTableHotkeysHookOptions {
  selectedEntityId?: string;
  handleCreateBtnClick: () => void;
  handleEditBtnClick: (event?: React.MouseEvent, entityId?: string) => void;
  handleDeleteBtnClick: (event?: React.MouseEvent, entityId?: string) => void;
}
export const useDefaultBrowserTableHotkeys = ({
  selectedEntityId,
  handleCreateBtnClick,
  handleEditBtnClick,
  handleDeleteBtnClick,
}: BrowserTableHotkeysHookOptions) => {
  useScreenHotkey(createEntityHotkeyConfig, handleCreateBtnClick);

  const editEntity = useCallback<KeyHandler>(() => {
    if (selectedEntityId) {
      handleEditBtnClick(undefined, selectedEntityId);
    }
  }, [handleEditBtnClick, selectedEntityId]);
  useScreenHotkey(editEntityHotkeyConfig, editEntity);

  const deleteEntity = useCallback<KeyHandler>(() => {
    if (selectedEntityId) {
      handleDeleteBtnClick(undefined, selectedEntityId);
    }
  }, [handleDeleteBtnClick, selectedEntityId]);
  useScreenHotkey(deleteEntityHotkeyConfig, deleteEntity);
}