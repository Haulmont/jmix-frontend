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
} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import {useCallback, useEffect, useMemo} from "react";
import {Modal} from "antd";
import {referencesListByEntityName} from "../util/componentsRegistration";
import {calcOffset, JmixPagination, PaginationChangeCallback, saveHistory} from "./pagination";
import {FilterChangeCallback, JmixEntityFilter} from "./filter";
import {JmixSortOrder, SortOrderChangeCallback} from "./sort";
import {action} from "mobx";
import { useLocalStore } from "mobx-react";
import {defaultPaginationConfig} from "../ui/paging/Paging";
import { PaginationConfig } from "antd/es/pagination";

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
  associations?: Record<string, string>;
}

export interface EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  loadItems: GraphQLQueryFn<TQueryVars>,
  listQueryResult: LazyQueryResult<TData, TQueryVars>,
  deleteItem: GraphQLMutationFn<TData, TMutationVars>,
  deleteMutationResult: MutationResult,
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
  associationOptionsMap?: Map<string, Array<HasId & MayHaveInstanceName>>;
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
    associations,
    paginationConfig = defaultPaginationConfig,
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
  
  // TODO We probably don't need useMemo here
  const optsWithVars = useMemo(() => ({
    variables: {
      filter: store.filter,
      orderBy: store.sortOrder,
      limit: store.pagination?.pageSize,
      offset: calcOffset(store.pagination?.current, store.pagination?.pageSize)
    } as TQueryVars,
    ...listQueryOptions
  }), [store.pagination, store.filter, store.sortOrder, listQueryOptions]);

  const intl = useIntl();

  const [loadItems, listQueryResult] = useLazyQuery<TData, TQueryVars>(listQuery, optsWithVars);
  const [deleteItem, deleteMutationResult] = useMutation<TData, TMutationVars>(deleteMutation, deleteMutationOptions);

  // Load items
  useEffect(() => {
    loadItems(listQueryOptions);
  }, [listQueryOptions, loadItems]);

  const items = listQueryResult.data?.[queryName];

  const associationOptionsMap = getAssociationOptions<TData>(listQueryResult.data, associations);

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

      if (!record) 
        throw new Error("Cannot find entity with id " + id);
      

      return record;
    },
    [items]
  );

  const deleteSelectedRow = useCallback(
    () => {
      if (store.selectedRowKey != null) 
        showDeletionDialog(getRecordById(store.selectedRowKey));
      
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
    loadItems, listQueryResult, deleteItem, deleteMutationResult, intl, showDeletionDialog,
    handleCreateBtnClick, handleEditBtnClick, handlePaginationChange, store,
    getRecordById,
    deleteSelectedRow,
    handleRowSelectionChange,
    handleFilterChange,
    handleSortOrderChange,
    associationOptionsMap
  };
}

export function getAssociationOptions<
  TData extends Record<string, any> = Record<string, any>
>(data?: TData, associations?: Record<string, string>): Map<string, Array<HasId & MayHaveInstanceName>> | undefined {
  if (data == null || associations == null) 
    return undefined;
  

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
    if (screens.currentScreenIndex === 0) 
      redirect(`${routingPath}/${entityId}`);
    

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
          if (e.id != null) 
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
      });
    },
    [intl, deleteMutation]
  );
}
