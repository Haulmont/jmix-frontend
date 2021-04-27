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
import {calcOffset, JmixPagination} from "./pagination";
import {defaultPagingConfig} from "../ui/paging/Paging";

export interface EntityTableHookOptions<TData, TQueryVars, TMutationVars> extends EntityListHookOptions<TData, TQueryVars, TMutationVars> {};

export interface EntityTableHookResult<TEntity, TData, TQueryVars, TMutationVars>
  extends EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {

  getRecordById: (id: string, items: Array<EntityInstance<TEntity>>) => EntityInstance<TEntity>;
  deleteSelectedRow: (items: Array<EntityInstance<TEntity>>) => void;
  handleRowSelectionChange: (selectedRowKeys: string[]) => void;
  handleFilterChange: FilterChangeCallback;
  handleSortOrderChange: SortOrderChangeCallback;
  store: EntityTableLocalStore;
  total?: number;
}

export interface EntityTableLocalStore {
  selectedRowKey?: string;
  filter?: JmixEntityFilter[];
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
    listQueryOptions,
    queryName
  } = options;

  const tableStore: EntityTableLocalStore = useLocalStore(() => ({
    selectedRowKey: undefined,
    filter: undefined,
    sortOrder: undefined,
    pagination: {
      current: defaultPagingConfig.current,
      pageSize: defaultPagingConfig.pageSize,
    }
  }));

  const tableQueryOptions = useMemo(() => ({
    variables: {
      filter: tableStore.filter,
      orderBy: tableStore.sortOrder,
      limit: tableStore.pagination?.pageSize,
      offset: calcOffset(tableStore.pagination?.current, tableStore.pagination?.pageSize)
    } as TQueryVars,
    ...listQueryOptions
  }), [tableStore, tableStore.filter, tableStore.sortOrder, tableStore.pagination, listQueryOptions]);

  const entityListHookResult = useEntityList<TEntity, TData, TQueryVars, TMutationVars>({
    ...options,
    listQueryOptions: tableQueryOptions
  });

  const {listQueryResult: {data}, showDeletionDialog, store} = entityListHookResult;

  tableStore.pagination = store.pagination;
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
      if (tableStore.selectedRowKey != null) {
        showDeletionDialog(getRecordById(tableStore.selectedRowKey));
      }
    },
    [getRecordById, showDeletionDialog, tableStore.selectedRowKey]
  );

  const handleRowSelectionChange = useCallback(
    action((selectedRowKeys: string[]) => {
      tableStore.selectedRowKey = selectedRowKeys[0];
    }),
    [tableStore.selectedRowKey]
  );

  const handleFilterChange = useCallback(
    action((filter?: JmixEntityFilter[]) => {
      tableStore.filter = filter;
    }),
    [tableStore.filter]
  );

  const handleSortOrderChange = useCallback(
    action((sortOrder?: JmixSortOrder) => {
      tableStore.sortOrder = sortOrder;
    }),
    [tableStore.sortOrder]
  );

  return {
    ...entityListHookResult,
    getRecordById,
    deleteSelectedRow,
    handleRowSelectionChange,
    handleFilterChange,
    handleSortOrderChange,
    store: tableStore,
  };
}
