import {
  ApolloCache,
  DocumentNode,
  LazyQueryHookOptions,
  LazyQueryResult,
  MutationHookOptions, MutationResult, Reference,
  TypedDocumentNode, useMutation
} from "@apollo/client";
import {
  EntityInstance,
  GraphQLMutationFn,
  GraphQLQueryFn,
  Screens,
  toIdString,
  dollarsToUnderscores,
  PaginationChangeCallback,
  FilterChangeCallback,
  SortOrderChangeCallback,
  JmixEntityFilter,
  JmixPagination,
  JmixSortOrder,
  ListQueryVars,
  useEntityListData,
  HasId,
} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import {useCallback, useEffect, useState} from "react";
import {action} from "mobx";
import { useLocalStore } from "mobx-react";
import {defaultPaginationConfig} from "../ui/paging/Paging";
import { PaginationConfig } from "antd/es/pagination";
import {openEntityEditorScreen} from "../util/screen";
import {showDeleteEntityDialog} from "./showDeleteEntityDialog";
import { saveHistory } from "./history";

export interface EntityListHookOptions<TEntity, TData, TQueryVars, TMutationVars> {
  listQuery: DocumentNode | TypedDocumentNode;
  listQueryOptions?: LazyQueryHookOptions<TData, TQueryVars>;
  deleteMutation: DocumentNode | TypedDocumentNode;
  deleteMutationOptions?: MutationHookOptions<TData, TMutationVars>;
  paginationConfig?: PaginationConfig;
  screens: Screens;
  entityName: string;
  routingPath: string;
  queryName?: string;
  entityList?: Array<EntityInstance<TEntity>>;
}

export interface EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  items?: Array<EntityInstance<TEntity>>;
  count?: number;
  relationOptions?: Map<string, Array<EntityInstance<unknown, HasId>>>;
  executeListQuery: GraphQLQueryFn<TQueryVars>;
  listQueryResult: LazyQueryResult<TData, TQueryVars>;
  executeDeleteMutation: GraphQLMutationFn<TData, TMutationVars>;
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

export function useEntityList<
  TEntity = any,
  TData extends Record<string, any> = Record<string, any>,
  TListQueryVars extends ListQueryVars = ListQueryVars,
  TMutationVars extends HasId = HasId
>(
  options: EntityListHookOptions<TEntity, TData, TListQueryVars, TMutationVars>
): EntityListHookResult<TEntity, TData, TListQueryVars, TMutationVars> {
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
    entityList: receivedEntityList
  } = options;

  const [entityList, setEntityList] = useState<Array<EntityInstance<TEntity>>>();

  useEffect(() => {
    if (receivedEntityList != null) {
      setEntityList(receivedEntityList);
    }
  }, [receivedEntityList]);

  const store: EntityListLocalStore = useLocalStore(() => ({
    selectedRowKey: undefined,
    filter: undefined,
    sortOrder: undefined,
    pagination: {
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    }
  }));

  const intl = useIntl();

  const {
    items,
    count,
    relationOptions,
    executeListQuery,
    listQueryResult
  } = useEntityListData<TEntity, TData, TListQueryVars>({
    entityList,
    listQuery,
    listQueryOptions,
    filter: store.filter,
    sortOrder: store.sortOrder,
    pagination: store.pagination,
    entityName
  });

  const [executeDeleteMutation, deleteMutationResult] = useMutation<TData, TMutationVars>(deleteMutation, deleteMutationOptions);

  const showDeletionDialog = useDeletionDialogCallback<TEntity, TData, TMutationVars>(intl, executeDeleteMutation, queryName, entityList, setEntityList);
  const handleCreateBtnClick = useCreateBtnCallback(screens, entityName, entityList, setEntityList);
  const handleEditBtnClick = useEditBtnCallbck(screens, entityName, routingPath, entityList, setEntityList);

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

      const record: EntityInstance<TEntity> | undefined = (items ?? []).find((item: EntityInstance<TEntity>) => toIdString(item.id!) === id);

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
    count,
    relationOptions,
    executeListQuery,
    listQueryResult,
    executeDeleteMutation,
    deleteMutationResult,
    intl,
    showDeletionDialog,
    handleCreateBtnClick,
    handleEditBtnClick,
    handlePaginationChange,
    store,
    getRecordById,
    deleteSelectedRow,
    handleRowSelectionChange,
    handleFilterChange,
    handleSortOrderChange
  };
}

export function useCreateBtnCallback<TEntity>(
  screens: Screens,
  entityName: string,
  entityList?: Array<EntityInstance<TEntity>>,
  setEntityList?: (entityList: Array<EntityInstance<TEntity>>) => void
) {
  const {onCommit, submitBtnCaption} = getEditorOptions(entityList, setEntityList);

  return useCallback(() => {
    openEntityEditorScreen({screens, entityName, onCommit, submitBtnCaption});
  }, [screens, entityName, entityList]);
}

export function useEditBtnCallbck<TEntity>(
  screens: Screens,
  entityName: string,
  routingPath: string,
  entityList?: Array<EntityInstance<TEntity>>,
  setEntityList?: (entityList: Array<EntityInstance<TEntity>>) => void,
  entityInstance?: EntityInstance<TEntity>
) {
  const {onCommit, submitBtnCaption} = getEditorOptions(entityList, setEntityList);

  return useCallback((entityIdToLoad: string) => {
    openEntityEditorScreen({
      screens, entityName, entityIdToLoad, routingPath, entityInstance, onCommit, submitBtnCaption
    });
  }, [screens, routingPath, entityName, entityList]);
}

export function useDeletionDialogCallback<
  TEntity,
  TData extends Record<string, any> = Record<string, any>,
  TVariables extends HasId = HasId
  >(
  intl: IntlShape,
  deleteMutation: GraphQLMutationFn<TData, TVariables>,
  queryName: string,
  entityList?: Array<EntityInstance<TEntity>>,
  setEntityList?: (entityList: Array<EntityInstance<TEntity>>) => void
) {
  return useCallback(
    (e: EntityInstance<TEntity>) => {
      let onConfirm;

      if (entityList != null && setEntityList != null) {
        onConfirm = () => {
          setEntityList(
            entityList.filter(entity => entity !== e)
          );
        };
      } else {
        onConfirm = getDefaultOnConfirm(e as EntityInstance<TEntity, HasId>, deleteMutation, queryName);
      }

      showDeleteEntityDialog(onConfirm, intl, e);
    },
    [intl, deleteMutation, entityList]
  );
}

function getEditorOptions<TEntity>(
  entityList?: Array<EntityInstance<TEntity>>,
  setEntityList?: (entityList: Array<EntityInstance<TEntity>>) => void,
): {
  onCommit?: (entityInstance?: EntityInstance<TEntity>) => void,
  submitBtnCaption?: string
} {
  let onCommit: ((entityInstance?: EntityInstance<TEntity>) => void) | undefined;
  let submitBtnCaption: string | undefined;

  if (entityList != null && setEntityList != null) {
    submitBtnCaption = 'common.ok';
    onCommit = (entityInstance?: EntityInstance<TEntity>) => {
      if (entityInstance != null) {
        setEntityList([
          entityInstance,
          ...entityList
        ]);
      }
    };
  }

  return {onCommit, submitBtnCaption};
}

function getDefaultOnConfirm<
  TEntity,
  TData,
  TVariables extends HasId = HasId
>(
  e: EntityInstance<TEntity, HasId>,
  deleteMutation: GraphQLMutationFn<TData, TVariables>,
  queryName: string
) {
  return () => {
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
}
