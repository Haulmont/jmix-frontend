import {useCallback} from "react";
import {action} from "mobx";
import {EntityListState} from "../useEntityList";
import { JmixSortOrder } from "@haulmont/jmix-react-core";

export function useSortOrderChangeCallback<TEntity>(
  entityListState: EntityListState<TEntity>
) {
  return useCallback(
    action((sortOrder?: JmixSortOrder) => {
      entityListState.sortOrder = sortOrder;
    }),
    [entityListState.sortOrder]
  );
}