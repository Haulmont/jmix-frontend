import {useLocalStore} from "mobx-react";
import {useCallback} from "react";
import {EntityListHookOptions, EntityListHookResult, LimitAndOffset, useEntityList} from "./useEntityList";
import {EntityInstance, HasId, toIdString} from "@haulmont/jmix-react-core";
import {
  FilterChangeCallback,
  JmixEntityFilter, JmixPagination,
  JmixSortOrder,
  PaginationChangeCallback,
  SortOrderChangeCallback
} from "./interfaces";
import {operatorToOptionClassName} from "../ui/table/DataTableCustomFilter";

export interface EntityTableHookOptions<TData, TQueryVars, TMutationVars> extends EntityListHookOptions<TData, TQueryVars, TMutationVars> {
  queryName: string;
}

export interface EntityTableHookResult<TEntity, TData, TQueryVars, TMutationVars>
  extends EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {

  getRecordById: (id: string) => EntityInstance<TEntity>;
  deleteSelectedRow: () => void;
  handleRowSelectionChange: (selectedRowKeys: string[]) => void;
  handleFilterChange: FilterChangeCallback;
  handleSortOrderChange: SortOrderChangeCallback;
  handlePaginationChange: PaginationChangeCallback;
  selectedRowKey?: string;
}

export interface EntityTableLocalStore {
  selectedRowKey?: string;
  filter?: JmixEntityFilter;
  sortOrder?: JmixSortOrder;
  pagination?: JmixPagination;
}

export function useEntityTable<
  TEntity,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars extends LimitAndOffset = LimitAndOffset,
  TMutationVars extends HasId = HasId
  >(
  options: EntityTableHookOptions<TData, TQueryVars, TMutationVars>
): EntityTableHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const {
    queryName
  } = options;

  const store: EntityTableLocalStore = useLocalStore(() => ({}));

  const entityListHookResult = useEntityList<TEntity, TData, TQueryVars, TMutationVars>({
    ...options,
    listQueryOptions:
  });
  const {listQueryResult: {data}, showDeletionDialog} = entityListHookResult;
  const items = data?.[queryName];

  const getRecordById = useCallback(
    (id: string): EntityInstance<TEntity> => {
      const record: EntityInstance<TEntity> | undefined = items.find((item: EntityInstance<TEntity>) => toIdString(item.id!) === id);

      if (!record) {
        throw new Error("Cannot find entity with id " + id);
      }

      return record;
    },
    [items]
  );

  const deleteSelectedRow = useCallback(
    () => {
      if (store.selectedRowKey != null) {
        showDeletionDialog(getRecordById(store.selectedRowKey));
      }
    },
    [getRecordById, showDeletionDialog, store.selectedRowKey]
  );

  const handleRowSelectionChange = useCallback(
    (selectedRowKeys: string[]) => {
      store.selectedRowKey = selectedRowKeys[0];
    },
    [store.selectedRowKey]
  );

  const handleFilterChange = useCallback(
    (filter: JmixEntityFilter) => {

    },
    []
  );

  return {
    ...entityListHookResult,
    getRecordById,
    deleteSelectedRow,
    handleRowSelectionChange
  };
}
