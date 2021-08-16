import {useCallback} from "react";
import {action} from "mobx";
import {EntityListState} from "../useEntityList";
import {IMultiScreenItem, JmixPagination} from "@haulmont/jmix-react-core";

export function usePaginationChangeCallback<TEntity>(
  entityListState: EntityListState<TEntity>,
  routingPath: string,
  currentScreen?: IMultiScreenItem,
  onPagination?: (routingPath: string, pagination?: JmixPagination) => void
) {
  return useCallback(
    action((current?: number, pageSize?: number) => {
      entityListState.pagination = {
        current,
        pageSize
      };
      onPagination?.(routingPath, entityListState.pagination);

      if(currentScreen != null) {
        if (currentScreen.params === undefined) {
          currentScreen.params = {}
        }

        if (current && pageSize) {
          currentScreen.params.pagination = {
            pageSize,
            page: current,
          }
        } else  {
          currentScreen.params = undefined;
        }
      }
    }),
    [entityListState.pagination, routingPath, currentScreen]
  );
}
