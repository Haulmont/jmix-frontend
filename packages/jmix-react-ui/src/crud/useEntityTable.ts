import {useLocalStore} from "mobx-react";
import {useCallback, useMemo} from "react";
import {
  EntityListHookOptions,
  EntityListHookResult,
  ListQueryVars,
  useEntityList
} from "./useEntityList";
import {EntityInstance, HasId, toIdString} from "@haulmont/jmix-react-core";
import {
  FilterChangeCallback,
  JmixEntityFilter, JmixPagination,
  JmixSortOrder,
  PaginationChangeCallback,
  SortOrderChangeCallback
} from "./interfaces";
import {runInAction} from "mobx";

export interface EntityTableHookOptions<TData, TQueryVars, TMutationVars> extends EntityListHookOptions<TData, TQueryVars, TMutationVars> {}

export interface EntityTableHookResult<TEntity, TData, TQueryVars, TMutationVars>
  extends EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {

  getRecordById: (id: string, items: Array<EntityInstance<TEntity>>) => EntityInstance<TEntity>;
  deleteSelectedRow: (items: Array<EntityInstance<TEntity>>) => void;
  handleRowSelectionChange: (selectedRowKeys: string[]) => void;
  handleFilterChange: FilterChangeCallback;
  handleSortOrderChange: SortOrderChangeCallback;
  handlePaginationChange: PaginationChangeCallback;
  store: EntityTableLocalStore;
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
  TQueryVars extends ListQueryVars = ListQueryVars,
  TMutationVars extends HasId = HasId
  >(
  options: EntityTableHookOptions<TData, TQueryVars, TMutationVars>
): EntityTableHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const {
    listQueryOptions
  } = options;

  const store: EntityTableLocalStore = useLocalStore(() => ({
    selectedRowKey: undefined,
    filter: undefined,
    sortOrder: undefined,
    pagination: undefined
  }));

  const tableQueryOptions = useMemo(() => ({
    variables: {
      filter: store.filter,
      orderBy: store.sortOrder,
      limit: store.pagination?.limit,
      offset: store.pagination?.offset
    } as TQueryVars,
    ...listQueryOptions
  }), [store, store.filter, store.sortOrder, store.pagination, listQueryOptions]);

  console.log('tableQueryOptions', tableQueryOptions);

  const entityListHookResult = useEntityList<TEntity, TData, TQueryVars, TMutationVars>({
    ...options,
    listQueryOptions: tableQueryOptions
  });

  const {listQueryResult: {data}, showDeletionDialog} = entityListHookResult;

  const getRecordById = useCallback(
    (id: string, items: Array<EntityInstance<TEntity>>): EntityInstance<TEntity> => {
      const record: EntityInstance<TEntity> | undefined = items.find((item: EntityInstance<TEntity>) => toIdString(item.id!) === id);

      if (!record) {
        throw new Error("Cannot find entity with id " + id);
      }

      return record;
    },
    [data]
  );

  const deleteSelectedRow = useCallback(
    (items: Array<EntityInstance<TEntity>>) => {
      if (store.selectedRowKey != null) {
        showDeletionDialog(getRecordById(store.selectedRowKey, items));
      }
    },
    [getRecordById, showDeletionDialog, store.selectedRowKey]
  );

  const handleRowSelectionChange = useCallback(
    (selectedRowKeys: string[]) => {
      runInAction(() => {
        store.selectedRowKey = selectedRowKeys[0];
      });
    },
    [store.selectedRowKey]
  );

  const handleFilterChange = useCallback(
    (filter?: JmixEntityFilter) => {
      runInAction(() => {
        store.filter = filter;
      });
    },
    [store]
  );

  const handleSortOrderChange = useCallback(
    (sortOrder?: JmixSortOrder) => {
      runInAction(() => {
        store.sortOrder = sortOrder;
      });
    },
    [store.sortOrder]
  );

  const handlePaginationChange = useCallback(
    (pagination?: JmixPagination) => {
      runInAction(() => {
        store.pagination = pagination;
        // TODO save history
      });
    },
    [store]
  );

  return {
    ...entityListHookResult,
    getRecordById,
    deleteSelectedRow,
    handleRowSelectionChange,
    handleFilterChange,
    handleSortOrderChange,
    handlePaginationChange,
    store
  };
}
