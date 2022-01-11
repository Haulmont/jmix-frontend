import {
  DocumentNode,
  LazyQueryHookOptions,
  LazyQueryResult,
  MutationHookOptions,
  MutationResult,
  TypedDocumentNode,
  useMutation
} from "@apollo/client";
import {
  EntityInstance,
  GraphQLMutationFn,
  GraphQLQueryFn,
  useScreens,
  dollarsToUnderscores,
  PaginationChangeCallback,
  FilterChangeCallback,
  SortOrderChangeCallback,
  JmixEntityFilter,
  JmixPagination,
  JmixSortOrder,
  useEntityListData,
  HasId,
} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import {useState} from "react";
import {useLocalObservable} from "mobx-react";
import {defaultPaginationConfig} from "../../ui/paging/config";
import {useParentScreen} from "../../util/screen";
import {useDeleteBtnCallback} from "./ui-callbacks/useDeleteBtnCallback";
import {useCreateBtnCallback} from "./ui-callbacks/useCreateBtnCallback";
import {useEditBtnCallback} from "./ui-callbacks/useEditBtnCallback";
import {usePaginationChangeCallback} from "./ui-callbacks/usePaginationChangeCallback";
import {useSelectionChangeCallback} from "./ui-callbacks/useSelectionChangeCallback";
import {useFilterChangeCallback} from "./ui-callbacks/useFilterChangeCallback";
import {useSortOrderChangeCallback} from "./ui-callbacks/useSortOrderChangeCallback";
import * as React from "react";
import {createDeleteMutation} from "./util/createDeleteMutation";

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
  deleteMutation?: DocumentNode | TypedDocumentNode;
  /**
   * Options that will be passed to Apollo Client `useMutation` hook along with {@link deleteMutation}.
   */
  deleteMutationOptions?: MutationHookOptions<TData, TMutationVars>;
  /**
   * Determines the initial pagination state. Note that route parameters will override this prop.
   */
  paginationConfig?: JmixPagination;
  entityName: string;
  /**
   * Base route path
   */
  routingPath: string;
  /**
   * Use to provide the entity list directly instead of obtaining it from backend.
   * This is the full list of entities, before applying pagination, filtering and sorting.
   */
  entityList?: Array<EntityInstance<TEntity>>;
  /**
   * A callback that will be executed when {@link entityList} is changed
   * (e.g. entities are added, removed or modified).
   * @param entityList {@link entityList}
   */
  onEntityListChange?: (entityList?: Array<EntityInstance<TEntity>>) => void;
  /**
   * Pass `true` if you don't want the query to be automatically executed upon invocation of the hook.
   * You will be able to trigger the query manually by invoking {@link EntityListHookResult.executeListQuery} function.
   */
  lazyLoading?: boolean;
  onOpenScreenError?: (entityName: string) => void;
  onEntityDelete?:  (onConfirm: () => void, entityInstance?: EntityInstance) => void;
  onPagination?: (routingPath: string, pagination?: JmixPagination) => void;
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
   * A map between child entity names and arrays of possible values.
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
  /**
   * A callback that will be executed when user clicks the Create button.
   */
  handleCreateBtnClick: () => void;
  /**
   * A callback that will be executed when user clicks the Clone button.
   */
  handleCloneBtnClick: () => void;
  /**
   * A callback that will be executed when user clicks the Edit button.
   */
  handleEditBtnClick: (event?: React.MouseEvent, entityId?: string) => void;
  /**
   * A callback that will be executed when user clicks the Delete button.
   */
  handleDeleteBtnClick: (event?: React.MouseEvent, entityId?: string) => void;
  /**
   * A callback that will be executed when user changes the pagination.
   */
  handlePaginationChange: PaginationChangeCallback;
  /**
   * A callback that will be executed when entity instances are selected or deselected.
   * @param selectedEntityIds
   */
  handleSelectionChange: (selectedEntityIds: string[]) => void;
  /**
   * A callback that will be executed when filters are changed.
   */
  handleFilterChange: FilterChangeCallback;
  /**
   * A callback that will be executed when sorting is changed.
   */
  handleSortOrderChange: SortOrderChangeCallback;
  /**
   * Observable state
   */
  entityListState: EntityListState<TEntity>;
  /**
   * A callback that closes the current screen and sets its parent as active screen.
   */
  goToParentScreen: () => void;
}

export interface EntityListState<TEntity> {
  /**
   * If entity list is provided directly via {@link EntityListHookOptions.entityList} rather than being obtained from backend,
   * this variable will store the entity list including all changes made to it.
   */
  entityList?: Array<EntityInstance<TEntity>>;
  /**
   * Identifier of the selected entity instance.
   */
  selectedEntityId?: string;
  /**
   * State of entity list filters.
   */
  filter?: JmixEntityFilter[];
  /**
   * State of entity list sort order.
   */
  sortOrder?: JmixSortOrder;
  /**
   * State of entity list pagination.
   */
  pagination?: JmixPagination;
}

export function useEntityList<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars = any,
  TMutationVars extends HasId = HasId
>(
  options: EntityListHookOptions<TEntity, TData, TQueryVars, TMutationVars>
): EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const {
    entityName,
    listQuery,
    listQueryOptions,
    deleteMutation = createDeleteMutation(entityName),
    deleteMutationOptions,
    routingPath,
    paginationConfig = defaultPaginationConfig,
    entityList,
    onEntityListChange,
    lazyLoading,
    onOpenScreenError,
    onEntityDelete,
    onPagination
  } = options;

  const queryName = `${dollarsToUnderscores(entityName)}List`;
  const screens = useScreens();
  const intl = useIntl();

  const [pagingDataFromUrl] = useState(() => {
    const query = new URLSearchParams(window.location.search);
    return {
      page: Number(query.get('page')) || paginationConfig.current,
      pageSize: Number(query.get('pageSize')) || paginationConfig.pageSize,
    }
  });

  const entityListState: EntityListState<TEntity> = useLocalObservable(() => ({
    entityList,
    selectedEntityId: undefined,
    filter: undefined,
    sortOrder: undefined,
    pagination: {
      ...paginationConfig,
      current: pagingDataFromUrl.page,
      pageSize: pagingDataFromUrl.pageSize,
    }
  }));

  // Used e.g. when entity browser represents the content of a One-to-Many Composition field
  const handleEntityListChange = (newEntityList: Array<EntityInstance<TEntity>>) => {
    entityListState.entityList = newEntityList; // Update local state (what is shown in the entity browser)
    if (onEntityListChange != null) { // Update external state (e.g. parent entity value)
      onEntityListChange(newEntityList);
    }
  };

  const {
    items,
    count,
    relationOptions,
    executeListQuery,
    listQueryResult
  } = useEntityListData<TEntity, TData, TQueryVars>({
    entityList: entityListState.entityList,
    listQuery,
    listQueryOptions,
    filter: entityListState.filter,
    sortOrder: entityListState.sortOrder,
    pagination: entityListState.pagination,
    entityName,
    lazyLoading
  });

  const [executeDeleteMutation, deleteMutationResult] = useMutation<TData, TMutationVars>(deleteMutation, deleteMutationOptions);

  const handleCreateBtnClick = useCreateBtnCallback(
    screens, 
    entityName, 
    entityListState.entityList, 
    handleEntityListChange, 
    onOpenScreenError
  );
  const handleCloneBtnClick = useCreateBtnCallback(
    screens, 
    entityName, 
    entityListState.entityList, 
    handleEntityListChange, 
    onOpenScreenError,
    entityListState.selectedEntityId
  );
  const handleEditBtnClick = useEditBtnCallback(
    screens, 
    entityName, 
    routingPath, 
    entityListState.selectedEntityId, 
    entityListState.entityList, 
    handleEntityListChange, 
    onOpenScreenError
  );
  const handleDeleteBtnClick = useDeleteBtnCallback(
    intl, 
    executeDeleteMutation, 
    queryName, 
    entityListState.selectedEntityId, 
    items, 
    entityListState.entityList, 
    handleEntityListChange, 
    onEntityDelete
  );

  const handlePaginationChange = usePaginationChangeCallback(entityListState, routingPath, screens.currentScreen, onPagination);
  const handleSelectionChange = useSelectionChangeCallback(entityListState);
  const handleFilterChange = useFilterChangeCallback(entityListState);
  const handleSortOrderChange = useSortOrderChangeCallback(entityListState);

  const goToParentScreen = useParentScreen(routingPath);

  // If we have deleted the last item on page, and it's not the first page, we want to change pagination
  if (items?.length === 0
    && entityListState?.pagination?.current != null
    && entityListState?.pagination?.current > 1
  ) {
    handlePaginationChange(entityListState?.pagination?.current - 1, entityListState?.pagination?.pageSize);
  }

  return {
    items,
    count,
    relationOptions,
    executeListQuery,
    listQueryResult,
    executeDeleteMutation,
    deleteMutationResult,
    intl,
    handleCreateBtnClick,
    handleEditBtnClick,
    handlePaginationChange,
    handleDeleteBtnClick,
    handleSelectionChange,
    handleFilterChange,
    handleSortOrderChange,
    handleCloneBtnClick,
    entityListState,
    goToParentScreen
  };
}
