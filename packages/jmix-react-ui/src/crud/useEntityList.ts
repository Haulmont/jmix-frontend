import {
  ApolloCache,
  DocumentNode,
  LazyQueryHookOptions,
  LazyQueryResult,
  MutationHookOptions, MutationResult, Reference,
  TypedDocumentNode, useLazyQuery, useMutation
} from "@apollo/client";
import {
  EntityInstance,
  GraphQLMutationFn,
  GraphQLQueryFn,
  HasId,
  Screens,
  toIdString,
  MayHaveInstanceName,
  dollarsToUnderscores,
  MayHaveId,
  getListQueryName,
  extractEntityName
} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import {useCallback, useEffect} from "react";
import {calcOffset, JmixPagination, PaginationChangeCallback, saveHistory} from "./pagination";
import {FilterChangeCallback, JmixEntityFilter} from "./filter";
import {JmixSortOrder, SortOrderChangeCallback} from "./sort";
import {action} from "mobx";
import { useLocalStore } from "mobx-react";
import {defaultPaginationConfig} from "../ui/paging/Paging";
import { PaginationConfig } from "antd/es/pagination";
import {openEntityEditorScreen} from "../util/screen";
import {showDeleteEntityDialog} from "./showDeleteEntityDialog";

export interface EntityListHookOptions<TData, TQueryVars, TMutationVars> {
  listQuery: DocumentNode | TypedDocumentNode;
  listQueryOptions?: LazyQueryHookOptions<TData, TQueryVars>;
  deleteMutation: DocumentNode | TypedDocumentNode;
  deleteMutationOptions?: MutationHookOptions<TData, TMutationVars>;
  paginationConfig?: PaginationConfig;
  screens: Screens;
  entityName: string;
  routingPath: string;
  queryName?: string;
  entityList?: MayHaveId[];
}

export interface EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  items: TEntity[];
  relationOptions?: Map<string, Array<HasId & MayHaveInstanceName>>;
  loadItems: GraphQLQueryFn<TQueryVars>;
  listQueryResult: LazyQueryResult<TData, TQueryVars>;
  deleteItem: GraphQLMutationFn<TData, TMutationVars>;
  deleteMutationResult: MutationResult;
  intl: IntlShape;
  showDeletionDialog: (e: EntityInstance<TEntity>) => void;
  handleCreateBtnClick: () => void;
  handleEditBtnClick: (id: string) => void;
  handlePaginationChange: PaginationChangeCallback;
  getRecordById: (id: string, items: Array<EntityInstance<TEntity>>) => EntityInstance<TEntity>;
  deleteSelectedRow: (items: Array<EntityInstance<TEntity>>) => void;
  handleRowSelectionChange: (selectedRowKeys: string[]) => void;
  handleFilterChange: FilterChangeCallback;
  handleSortOrderChange: SortOrderChangeCallback;
  store: EntityListLocalStore;
}

export interface EntityListLocalStore {
  selectedRowKey?: string;
  filter?: JmixEntityFilter[];
  sortOrder?: JmixSortOrder;
  pagination?: JmixPagination;
}

export interface ListQueryVars {
  filter?: JmixEntityFilter;
  orderBy?: JmixSortOrder;
  limit?: number;
  offset?: number;
  loadItems?: boolean;
}

export function useEntityList<
  TEntity,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars extends ListQueryVars = ListQueryVars,
  TMutationVars extends HasId = HasId
>(
  options: EntityListHookOptions<TData, TQueryVars, TMutationVars>
): EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const {
    listQuery,
    listQueryOptions,
    deleteMutation,
    deleteMutationOptions,
    screens,
    entityName,
    routingPath,
    queryName = `${dollarsToUnderscores(entityName)}List`,
    paginationConfig = defaultPaginationConfig,
    entityList
  } = options;

  const store: EntityListLocalStore = useLocalStore(() => ({
    selectedRowKey: undefined,
    filter: undefined,
    sortOrder: undefined,
    pagination: {
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    }
  }));
  
  const optsWithVars = {
    variables: {
      filter: store.filter,
      orderBy: store.sortOrder,
      limit: store.pagination?.pageSize,
      offset: calcOffset(store.pagination?.current, store.pagination?.pageSize),
      loadItems: entityList == null
    } as TQueryVars,
    ...listQueryOptions
  };

  const intl = useIntl();

  const [loadItems, listQueryResult] = useLazyQuery<TData, TQueryVars>(listQuery, optsWithVars);
  const [deleteItem, deleteMutationResult] = useMutation<TData, TMutationVars>(deleteMutation, deleteMutationOptions);

  // Load items
  useEffect(() => {
    loadItems(listQueryOptions);
  }, [listQueryOptions, loadItems]);

  const items = entityList != null
    ? entityList
    : listQueryResult.data?.[queryName];

  const relationOptions = getRelationOptions<TData>(entityName, listQueryResult.data);

  const showDeletionDialog = useDeletionDialogCallback<TEntity, TData, TMutationVars>(intl, deleteItem, queryName);
  const handleCreateBtnClick = useCreateBtnCallback(screens, entityName);
  const handleEditBtnClick = useEditBtnCallbck(screens, entityName, routingPath);

  const handlePaginationChange = useCallback(
    action((current?: number, pageSize?: number) => {
      store.pagination = {
        current,
        pageSize
      };
      saveHistory(routingPath, store.pagination);
    }),
    [store.pagination, routingPath]
  );

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

  return {
    items,
    relationOptions,
    loadItems, listQueryResult, deleteItem, deleteMutationResult, intl, showDeletionDialog,
    handleCreateBtnClick, handleEditBtnClick, handlePaginationChange, store,
    getRecordById,
    deleteSelectedRow,
    handleRowSelectionChange,
    handleFilterChange,
    handleSortOrderChange
  };
}

export function getRelationOptions<
  TData extends Record<string, any> = Record<string, any>
>(entityName: string, data?: TData): Map<string, Array<HasId & MayHaveInstanceName>> | undefined {
  if (data == null) {
    return undefined;
  }

  const map = new Map();

  Object.keys(data)
    .filter(queryName => {
      // Filter out query result related to the entity being listed so that only relation options are left
      return queryName !== getListQueryName(entityName)
    })
    .map(queryName => {
      const relatedEntityName = extractEntityName(queryName, 'List');
      map.set(relatedEntityName, data[queryName] ?? []);
    });

  return map;
}

export function useCreateBtnCallback(screens: Screens, entityName: string) {
  return useCallback(() => {
    openEntityEditorScreen({screens, entityName});
  }, [screens, entityName]);
}

export function useEditBtnCallbck(screens: Screens, entityName: string, routingPath: string) {
  return useCallback((entityIdToLoad: string) => {
    openEntityEditorScreen({
      screens, entityName, entityIdToLoad, routingPath
    });
  }, [screens, routingPath, entityName]);
}

export function useDeletionDialogCallback<
  TEntity,
  TData extends Record<string, any> = Record<string, any>,
  TVariables extends HasId = HasId
  >(
  intl: IntlShape,
  deleteMutation: GraphQLMutationFn<TData, TVariables>,
  queryName: string
) {
  return useCallback(
    (e: EntityInstance<TEntity>) => {
      const onConfirm = () => {
          if (e.id != null) {
            // noinspection JSIgnoredPromiseFromCall
            deleteMutation({
              variables: { id: e.id } as TVariables,
              update(cache: ApolloCache<TData>) {
                // Remove deleted item from cache
                cache.modify({
                  fields: {
                    [queryName](existingRefs, { readField }) {
                      return existingRefs.filter(
                        (ref: Reference) => e.id !== readField("id", ref)
                      );
                    }
                  }
                });
              }
            });
          }
        };

      showDeleteEntityDialog(onConfirm, intl, e);
    },
    [intl, deleteMutation]
  );
}

