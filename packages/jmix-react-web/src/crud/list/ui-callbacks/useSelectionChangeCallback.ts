import {useCallback} from "react";
import {action} from "mobx";
import { EntityListState } from "../useEntityList";

export function useSelectionChangeCallback<TEntity = unknown>(
  entityListState: EntityListState<TEntity>
) {
  return useCallback(
    action((selectedRowKeys: string[]) => {
      entityListState.selectedEntityId = selectedRowKeys[0];
    }),
    [entityListState.selectedEntityId]
  );
}
