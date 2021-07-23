import {useMasterDetailStore} from "./MasterDetailContext";

export function useChangeConfirm() {
  const masterDetailStore = useMasterDetailStore();

  return {
    setDirty: () => masterDetailStore.setDirty(true),
    setPristine: () => masterDetailStore.setDirty(false)
  }
}