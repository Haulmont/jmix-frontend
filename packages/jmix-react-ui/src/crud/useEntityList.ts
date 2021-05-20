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
import {useCallback} from "react";
import {action} from "mobx";
import { useLocalStore } from "mobx-react";
import {defaultPaginationConfig} from "../ui/paging/Paging";
import { PaginationConfig } from "antd/es/pagination";
import {openEntityEditorScreen} from "../util/screen";
import {showDeleteEntityDialog} from "./showDeleteEntityDialog";
import { saveHistory } from "./history";

export interface EntityListHookOptions<TEntity, TData, TQueryVars, TMutationVars> {
  /**
   * GraphQL query that retrieves the list of entities.
   * Will be passed to Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook along with {@link listQueryOptions}.
   */
  listQuery: DocumentNode | TypedDocumentNode;
  /**
   * Options that will be passed to Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook along with {@link listQuery}.
   */
  listQueryOptions?: LazyQueryHookOptions<TData, TQueryVars>;
  /**
   * GraphQL mutation that deletes a given entity instance.
   * Will be passed to Apollo Client `useMutation` hook along with {@link deleteMutationOptions}.
   */
  deleteMutation: DocumentNode | TypedDocumentNode;
  /**
   * Options that will be passed to Apollo Client `useMutation` hook along with {@link deleteMutation}.
   */
  deleteMutationOptions?: MutationHookOptions<TData, TMutationVars>;
  /**
   * Determines the initial pagination state.
   */
  paginationConfig?: PaginationConfig;
  screens: Screens; // TODO remove, obtain via context
  entityName: string;
  routingPath: string;
  queryName?: string; // TODO remove
  /**
   * Use to provide the entity list directly instead of obtaining it from backend.
   * Note that backend will still be queried for {@link EntityListHookResult.relationOptions} if applicable.
   */
  entityList?: Array<EntityInstance<TEntity>>;
  /**
   * A callback that will be executed when {@link entityList} is changed
   * (e.g. entities are added, removed or modified).
   * @param entityList {@link entityList}
   */
  onEntityListChange?: (entityList?: Array<EntityInstance<TEntity>>) => void;
  /**
   * The name of One-to-Many Composition attribute in the parent entity.
   * Applicable when entity list component represents the content of One-to-Many Composition attribute in the parent entity.
   */
  reverseAttrName?: string;
}

export interface EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  /**
   * Entity instances that will be displayed by the list component.
   *
   * When {@link EntityListHookOptions.entityList} is not used, {@link items} will contain
   * the entity instances retrived from backend upon execution of {@link EntityListHookOptions.listQuery}
   * (it is also obtainable as {@link listQueryResult}`.data.${entityName}List`).
   *
   * When {@link EntityListHookOptions.entityList} is used, {@link items} will contain a relevant
   * portion of {@link EntityListHookOptions.entityList} depending on pagination / sorting / filtering.
   */
  items?: Array<EntityInstance<TEntity>>;
  /**
   * Total number of entity instances.
   *
   * When {@link EntityListHookOptions.entityList} is not used, {@link count} will contain
   * the value retrived from backend upon execution of {@link EntityListHookOptions.listQuery}
   * (it is also obtainable as {@link listQueryResult}`.data.${entityName}Count`).
   *
   * When {@link EntityListHookOptions.entityList} is used, {@link count} will contain the total
   * number of elements in {@link EntityListHookOptions.entityList}.
   */
  count?: number;
  /**
   * Used when the entity has relation (Association and/or Composition) attributes.
   * A map between nested entity names and arrays of possible values.
   */
  relationOptions?: Map<string, Array<EntityInstance<unknown, HasId>>>;
  /**
   * Execute function returned from Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook.
   * A function that executes the {@link EntityListHookOptions.listQuery}.
   */
  executeListQuery: GraphQLQueryFn<TQueryVars>;
  /**
   * Result object returned from Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook.
   * Contains query result, loading and error status and more, see {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery}
   * documentation for details.
   */
  listQueryResult: LazyQueryResult<TData, TQueryVars>;
  /**
   * Execute function returned from Apollo Client {@link https://www.apollographql.com/docs/react/data/mutations/ | useMutation} hook.
   * A function that executes the {@link EntityListHookOptions.deleteMutation}.
   */
  executeDeleteMutation: GraphQLMutationFn<TData, TMutationVars>;
  /**
   * Result object returned  from Apollo Client {@link https://www.apollographql.com/docs/react/data/mutations/ | useMutation} hook.
   * Contains mutation result, loading and error status and more, see {@link https://www.apollographql.com/docs/react/data/mutations/ | useMutation}
   * documentation for details.
   */
  deleteMutationResult: MutationResult;
  /**
   * `react-intl` {@link https://formatjs.io/docs/react-intl/api/#the-intl-object | intl object}.
   */
  intl: IntlShape;
  // TODO remove
  showDeletionDialog: (e: EntityInstance<TEntity>) => void;
  /**
   * A callback that will be executed when user clicks the Create button.
   */
  handleCreateBtnClick: () => void;
  /**
   * A callback that will be executed when user clicks the Edit button.
   * @param id id of the selected entity instance
   */
  handleEditBtnClick: (id: string) => void;
  /**
   * A callback that will be executed when user changes the pagination.
   */
  handlePaginationChange: PaginationChangeCallback;
  // TODO probably remove
  getRecordById: (id: string, items: Array<EntityInstance<TEntity>>) => EntityInstance<TEntity>;
  // TODO rename to handleDeleteBtnClick, pass items via closure
  deleteSelectedRow: (items: Array<EntityInstance<TEntity>>) => void;
  /**
   * A callback that will be executed when entity instances are selected or deselected.
   * @param selectedRowKeys
   */
  // TODO rename to handleSelectionChange
  handleRowSelectionChange: (selectedRowKeys: string[]) => void;
  handleFilterChange: FilterChangeCallback;
  handleSortOrderChange: SortOrderChangeCallback;
  store: EntityListLocalStore<TEntity>;
}

export interface EntityListLocalStore<TEntity> {
  entityList?: Array<EntityInstance<TEntity>>;
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
    entityList,
    onEntityListChange,
    reverseAttrName,
  } = options;

  const store: EntityListLocalStore<TEntity> = useLocalStore(() => ({
    entityList,
    selectedRowKey: undefined,
    filter: undefined,
    sortOrder: undefined,
    pagination: {
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    }
  }));

  // Used e.g. when entity browser represents the content of a One-to-Many Composition field
  const handleEntityListChange = (newEntityList: Array<EntityInstance<TEntity>>) => {
    store.entityList = newEntityList; // Update local state (what is shown in the entity browser)
    if (onEntityListChange != null) { // Update external state (e.g. parent entity value)
      onEntityListChange(newEntityList);
    }
  };

  const intl = useIntl();

  const {
    items,
    count,
    relationOptions,
    executeListQuery,
    listQueryResult
  } = useEntityListData<TEntity, TData, TListQueryVars>({
    entityList: store.entityList,
    listQuery,
    listQueryOptions,
    filter: store.filter,
    sortOrder: store.sortOrder,
    pagination: store.pagination,
    entityName
  });

  const [executeDeleteMutation, deleteMutationResult] = useMutation<TData, TMutationVars>(deleteMutation, deleteMutationOptions);

  const showDeletionDialog = useDeletionDialogCallback<TEntity, TData, TMutationVars>(intl, executeDeleteMutation, queryName, store.entityList, handleEntityListChange);
  const handleCreateBtnClick = useCreateBtnCallback(screens, entityName, store.entityList, handleEntityListChange, reverseAttrName);
  const handleEditBtnClick = useEditBtnCallbck(screens, entityName, routingPath, store.entityList, handleEntityListChange, reverseAttrName);

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
  onEntityListChange?: (entityList: Array<EntityInstance<TEntity>>) => void,
  reverseAttrName?: string
) {
  const {submitBtnCaption, hiddenAttributes} = getEditorOptions(entityList, onEntityListChange, reverseAttrName);

  let onCommit: (entityInstance?: EntityInstance<TEntity>) => void;
  if (entityList != null && onEntityListChange != null) {
    onCommit = (entityInstance?: EntityInstance<TEntity>) => {
      if (entityInstance != null) {
        onEntityListChange([
          entityInstance,
          ...entityList
        ]);
      }
    };
  }

  return useCallback(() => {
    openEntityEditorScreen({
      screens,
      entityName,
      onCommit,
      submitBtnCaption,
      hiddenAttributes
    });
  }, [screens, entityName, entityList]);
}

export function useEditBtnCallbck<TEntity>(
  screens: Screens,
  entityName: string,
  routingPath: string,
  entityList?: Array<EntityInstance<TEntity>>,
  onEntityListChange?: (entityList: Array<EntityInstance<TEntity>>) => void,
  reverseAttrName?: string,
) {
  const {submitBtnCaption, hiddenAttributes} = getEditorOptions(entityList, onEntityListChange, reverseAttrName);

  let onCommit: (entityInstance?: EntityInstance<TEntity>) => void;
  if (entityList != null && onEntityListChange != null) {
    onCommit = (updatedEntityInstance?: EntityInstance<TEntity>) => {
      if (updatedEntityInstance != null) {
        const newList = entityList.map(oldEntityInstance => {
          if (oldEntityInstance.id === updatedEntityInstance.id) {
            return updatedEntityInstance
          }
          return oldEntityInstance;
        });
        onEntityListChange(newList);
      }
    };
  }

  return useCallback((entityIdToLoad: string) => {
    const entityInstance = entityList != null
      ? entityList.find(e => e.id === entityIdToLoad)
      : undefined;
    openEntityEditorScreen({
      screens, entityName, entityIdToLoad, routingPath, entityInstance, onCommit, submitBtnCaption, hiddenAttributes
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
  onEntityListChange?: (entityList: Array<EntityInstance<TEntity>>) => void
) {
  return useCallback(
    (e: EntityInstance<TEntity>) => {
      let onConfirm;

      if (entityList != null && onEntityListChange != null) {
        onConfirm = () => {
          onEntityListChange(
            entityList.filter(entity => entity.id !== e.id)
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
  onEntityListChange?: (entityList: Array<EntityInstance<TEntity>>) => void,
  reverseAttrName?: string
): {
  submitBtnCaption?: string,
  hiddenAttributes?: string[]
} {
  let submitBtnCaption: string | undefined;

  const hiddenAttributes = reverseAttrName != null
    ? [reverseAttrName]
    : undefined;

  if (entityList != null && onEntityListChange != null) {
    submitBtnCaption = 'common.ok';
  }

  return {submitBtnCaption, hiddenAttributes};
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
