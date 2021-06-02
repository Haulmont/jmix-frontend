import {useCallback} from "react";
import {action} from "mobx";
import { EntityListState } from "../useEntityList";

export function useSelectionChangeCallback<TEntity = unknown>(
  entityListState: EntityListState<TEntity>
) {
  // TODO: fix
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    action((selectedRowKeys: string[]) => {
      entityListState.selectedEntityId = selectedRowKeys[0];
    }),
    [entityListState.selectedEntityId]
  );
}