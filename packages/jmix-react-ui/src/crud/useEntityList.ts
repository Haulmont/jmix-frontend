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
  redirect,
  toIdString,
  MayHaveInstanceName,
  dollarsToUnderscores,
  ScreensContext,
} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import {useCallback, useContext, useEffect, useMemo} from "react";
import {Modal} from "antd";
import {referencesListByEntityName} from "../util/componentsRegistration";
import {calcOffset, JmixPagination, PaginationChangeCallback, saveHistory} from "./pagination";
import {FilterChangeCallback, JmixEntityFilter} from "./filter";
import {JmixSortOrder, SortOrderChangeCallback} from "./sort";
import {action} from "mobx";
import {useLocalObservable, useLocalStore } from "mobx-react";
import {defaultPagingConfig} from "../ui/paging/Paging";

export interface EntityListHookOptions<
  TListQueryData,
  TListQueryVars,
  TDeleteMutationData,
  TDeleteMutationVars
> {
  // Options for Apollo hooks
  listQuery: DocumentNode | TypedDocumentNode;
  listQueryOptions?: LazyQueryHookOptions<TListQueryData, TListQueryVars>;
  deleteMutation?: DocumentNode | TypedDocumentNode;
  deleteMutationOptions?: MutationHookOptions<TDeleteMutationData, TDeleteMutationVars>;

  // Other options
  entityName: string;
  routingPath: string;
}

export interface EntityListHookResult<
  TEntity,
  TListQueryData,
  TListQueryVars,
  TDeleteMutationData,
  TDeleteMutationVars
> {
  // Options for Apollo hooks
  executeListQuery: GraphQLQueryFn<TListQueryVars>,
  listQueryResult: LazyQueryResult<TListQueryData, TListQueryVars>,
  executeDeleteMutation: GraphQLMutationFn<TDeleteMutationData, TDeleteMutationVars>,
  deleteMutationResult: MutationResult,

  // State
  entityListState: EntityListState;

  // List component callbacks
  handleCreateEntity: () => void;
  handleEditEntity: () => void; // (id: string) => void;
  handleDeleteEntity: () => void;
  // deleteSelectedRow: (items: Array<EntityInstance<TEntity>>) => void;
  // showDeletionDialog: (e: EntityInstance<TEntity>) => void;
  // getRecordById: (id: string, items: Array<EntityInstance<TEntity>>) => EntityInstance<TEntity>;
  handlePaginationChange: PaginationChangeCallback;
  handleFilterChange: FilterChangeCallback;
  handleSortOrderChange: SortOrderChangeCallback;

  handleRowSelectionChange: (selectedRowKeys: string[]) => void;
}

export interface EntityListState {
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
    entityName,
    routingPath,
    // queryName = `${dollarsToUnderscores(entityName)}List`,
  } = options;

  // const screens = useContext(ScreensContext);
  // const intl = useIntl();


  const entityListState: EntityListState = useLocalObservable(() => ({
    selectedRowKey: undefined,
    filter: undefined,
    sortOrder: undefined,
    pagination: {
      current: defaultPagingConfig.current,
      pageSize: defaultPagingConfig.pageSize,
    }
  }));

  useEntityListQuery





  const [deleteItem, deleteMutationResult] = useMutation<TData, TMutationVars>(deleteMutation, deleteMutationOptions);





  const items = listQueryResult.data?.[queryName];

  const associationOptionsMap = getAssociationOptions<TData>(listQueryResult.data, associations);

  const showDeletionDialog = useDeletionDialogCallback<TEntity, TData, TMutationVars>(intl, deleteItem, queryName);
  const handleCreateBtnClick = useCreateBtnCallback(screens, entityName);
  const handleEditBtnClick = useEditBtnCallbck(screens, entityName, routingPath);

  const handlePaginationChange = useCallback(
    action((current?: number, pageSize?: number) => {
      entityListState.pagination = {
        current,
        pageSize
      };
      saveHistory(routingPath, entityListState.pagination);
    }),
    [entityListState.pagination, routingPath]
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
      if (entityListState.selectedRowKey != null) {
        showDeletionDialog(getRecordById(entityListState.selectedRowKey));
      }
    },
    [getRecordById, showDeletionDialog, entityListState.selectedRowKey]
  );

  const handleRowSelectionChange = useCallback(
    action((selectedRowKeys: string[]) => {
      entityListState.selectedRowKey = selectedRowKeys[0];
    }),
    [entityListState.selectedRowKey]
  );

  const handleFilterChange = useCallback(
    action((filter?: JmixEntityFilter[]) => {
      entityListState.filter = filter;
    }),
    [entityListState.filter]
  );

  const handleSortOrderChange = useCallback(
    action((sortOrder?: JmixSortOrder) => {
      entityListState.sortOrder = sortOrder;
    }),
    [entityListState.sortOrder]
  );

  return {
    executeListQuery: loadItems, listQueryResult, executeDeleteMutation: deleteItem, deleteMutationResult, intl, showDeletionDialog,
    handleCreateEntity: handleCreateBtnClick, handleEditEntity: handleEditBtnClick, handlePaginationChange, entityListState: entityListState,
    getRecordById,
    deleteSelectedRow,
    handleRowSelectionChange,
    handleFilterChange,
    handleSortOrderChange,
    associationOptionsMap
  };
}

export function useEntityListQuery<TData, TQueryVars>(
  entityListState: EntityListState
) {
  const optsWithVars = {
    variables: {
      filter: entityListState.filter,
      orderBy: entityListState.sortOrder,
      limit: entityListState.pagination?.pageSize,
      offset: calcOffset(entityListState.pagination?.current, entityListState.pagination?.pageSize)
    } as TQueryVars,
    ...listQueryOptions
  };
  const [loadItems, listQueryResult] = useLazyQuery<TData, TQueryVars>(listQuery, optsWithVars);
  // Load items
  useEffect(() => {
    loadItems(listQueryOptions);
  }, [listQueryOptions, loadItems]);
}

export function getAssociationOptions<
  TData extends Record<string, any> = Record<string, any>
>(data?: TData, associations?: Record<string, string>): Map<string, Array<HasId & MayHaveInstanceName>> | undefined {
  if (data == null || associations == null) {
    return undefined;
  }

  const map = new Map();

  Object.keys(associations).forEach(attrName => {
    const associationsListQuery = associations[attrName];
    map.set(attrName, data[associationsListQuery] ?? []);
  });

  return map;
}

export function useCreateBtnCallback(screens: Screens, entityName: string) {
  return useCallback(() => {
    const registeredReferral = referencesListByEntityName[entityName];

    screens.push({
      title: registeredReferral.entityItemNew.title,
      content: registeredReferral.entityItemNew.content
    });
  }, [screens, entityName]);
}

export function useEditBtnCallbck(screens: Screens, entityName: string, routingPath: string) {
  return useCallback((entityId: string) => {
    const registeredReferral = referencesListByEntityName[entityName];

    // If we are on root screen
    if (screens.currentScreenIndex === 0) {
      redirect(`${routingPath}/${entityId}`);
    }

    screens.push({
      title: registeredReferral.entityItemEdit.title,
      content: registeredReferral.entityItemEdit.content,
      params: {
        entityId
      }
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
      Modal.confirm({
        title: intl.formatMessage(
          { id: "management.browser.delete.areYouSure" },
          { instanceName: (e as any)._instanceName }
        ),
        okText: intl.formatMessage({
          id: "management.browser.delete.ok"
        }),
        cancelText: intl.formatMessage({ id: "common.cancel" }),
        onOk: () => {
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
        }
      });
    },
    [intl, deleteMutation]
  );
}
