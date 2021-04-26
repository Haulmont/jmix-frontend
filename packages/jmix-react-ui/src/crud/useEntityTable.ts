import {useLocalStore} from "mobx-react";
import {useCallback, useMemo} from "react";
import {
  EntityListHookOptions,
  EntityListHookResult,
  ListQueryVars,
  useEntityList
} from "./useEntityList";
import {EntityInstance, HasId, toIdString} from "@haulmont/jmix-react-core";
import {action} from "mobx";
import {FilterChangeCallback, JmixEntityFilter} from "./filter";
import {JmixSortOrder, SortOrderChangeCallback} from "./sort";
import {LimitAndOffset, PaginationChangeCallback, saveHistory} from "./pagination";

export interface EntityTableHookOptions<TData, TQueryVars, TMutationVars> extends EntityListHookOptions<TData, TQueryVars, TMutationVars> {};

export interface EntityTableHookResult<TEntity, TData, TQueryVars, TMutationVars>
  extends EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {

  getRecordById: (id: string, items: Array<EntityInstance<TEntity>>) => EntityInstance<TEntity>;
  deleteSelectedRow: (items: Array<EntityInstance<TEntity>>) => void;
  handleRowSelectionChange: (selectedRowKeys: string[]) => void;
  handleFilterChange: FilterChangeCallback;
  handleSortOrderChange: SortOrderChangeCallback;
  handlePaginationChange: PaginationChangeCallback;
  store: EntityTableLocalStore;
  total?: number;
}

export interface EntityTableLocalStore {
  selectedRowKey?: string;
  filter?: JmixEntityFilter[];
  sortOrder?: JmixSortOrder;
  pagination?: LimitAndOffset;
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
    listQueryOptions,
    queryName,
    routingPath
  } = options;

  const store: EntityTableLocalStore = useLocalStore(() => ({
    selectedRowKey: undefined,
    filter: undefined,
    sortOrder: undefined,
    pagination: {
      limit: 10,
      offset: 0
    }
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

  const entityListHookResult = useEntityList<TEntity, TData, TQueryVars, TMutationVars>({
    ...options,
    listQueryOptions: tableQueryOptions
  });

  const {listQueryResult: {data}, showDeletionDialog} = entityListHookResult;

  const items = data?.[queryName];

  // TODO probably we should pass all parameters explicitly rather than via closure and simply import these functions rather than obtain them from the hook
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
    action((selectedRowKeys: string[]) => {
      store.selectedRowKey = selectedRowKeys[0];
    }),
    [store.selectedRowKey]
  );

  const handleFilterChange = useCallback(
    action((filter?: JmixEntityFilter[]) => {
      store.filter = filter;
    }),
    [store.filter]
  );

  const handleSortOrderChange = useCallback(
    action((sortOrder?: JmixSortOrder) => {
      store.sortOrder = sortOrder;
    }),
    [store.sortOrder]
  );

  const handlePaginationChange = useCallback(
    action((pagination?: LimitAndOffset) => {
      store.pagination = pagination;
      saveHistory(routingPath, pagination);
    }),
    [store.pagination, routingPath]
  );

  return {
    ...entityListHookResult,
    getRecordById,
    deleteSelectedRow,
    handleRowSelectionChange,
    handleFilterChange,
    handleSortOrderChange,
    handlePaginationChange,
    store,
  };
}
