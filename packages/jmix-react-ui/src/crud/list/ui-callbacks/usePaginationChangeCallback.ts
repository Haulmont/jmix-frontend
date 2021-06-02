import {useCallback} from "react";
import {action} from "mobx";
import {saveHistory} from "../../../util/history";
import {EntityListState} from "../useEntityList";
import {IMultiScreenItem} from "@haulmont/jmix-react-core";

export function usePaginationChangeCallback<TEntity>(
  entityListState: EntityListState<TEntity>,
  routingPath: string,
  currentScreen: IMultiScreenItem
) {
  // TODO: fix
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    action((current?: number, pageSize?: number) => {
      entityListState.pagination = {
        current,
        pageSize
      };
      saveHistory(routingPath, entityListState.pagination);

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

    }),
    [entityListState.pagination, routingPath, currentScreen]
  );
}
