import {calcOffset, JmixPagination} from "./pagination";
import {DocumentNode, LazyQueryHookOptions, LazyQueryResult, TypedDocumentNode, useLazyQuery} from "@apollo/client";
import {JmixEntityFilter} from "./filter";
import {JmixSortOrder} from "./sort";
import {useEffect} from "react";
import {getDisplayedItems} from "./getDisplayedItems";
import { getRelationOptions } from "./getRelationOptions";
import {getCountQueryName, getListQueryName} from "../util/graphql";
import {GraphQLQueryFn} from "../data/aliases";
import { EntityInstance } from "./EntityInstance";
import {HasId} from "../util/metadata";

export interface EntityListDataHookOptions<TEntity, TData, TQueryVars> {
  /**
   * Use to provide the entity list directly instead of obtaining it from backend.
   * This is the full list of entities, before applying pagination, filtering and sorting.
   */
  entityList?: Array<EntityInstance<TEntity>>;
  entityName: string;
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
   * State of entity list filters.
   */
  filter?: JmixEntityFilter;
  /**
   * State of entity list sort order.
   */
  sortOrder?: JmixSortOrder;
  /**
   * State of entity list pagination.
   */
  pagination?: JmixPagination;
  /**
   * Pass `true` if you don't want the query to be automatically executed upon invocation of the hook.
   * You will be able to trigger the query manually by invoking {@link EntityListDataHookResult.executeListQuery} function.
   */
  lazyLoading?: boolean;
}

export interface EntityListDataHookResult<TEntity, TData, TQueryVars> {
  /**
   * Entity instances that will be displayed by the list component.
   *
   * When {@link EntityListDataHookOptions.entityList} is not used, {@link items} will contain
   * the entity instances retrived from backend upon execution of {@link EntityListDataHookOptions.listQuery}
   * (it is also obtainable as {@link listQueryResult}`.data.${entityName}List`).
   *
   * When {@link EntityListDataHookOptions.entityList} is used, {@link items} will contain a relevant
   * portion of {@link EntityListDataHookOptions.entityList} depending on pagination / sorting / filtering.
   */
  items?: Array<EntityInstance<TEntity>>;
  /**
   * Total number of entity instances.
   *
   * When {@link EntityListDataHookOptions.entityList} is not used, {@link count} will contain
   * the value retrived from backend upon execution of {@link EntityListDataHookOptions.listQuery}
   * (it is also obtainable as {@link listQueryResult}`.data.${entityName}Count`).
   *
   * When {@link EntityListDataHookOptions.entityList} is used, {@link count} will contain the total
   * number of elements in {@link EntityListDataHookOptions.entityList}.
   */
  count?: number;
  /**
   * Used when the entity has relation (Association and/or Composition) attributes.
   * A map between child entity names and arrays of possible values.
   */
  relationOptions?: Map<string, Array<EntityInstance<unknown, HasId>>>;
  /**
   * Execute function returned from Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook.
   * A function that executes the {@link EntityListDataHookOptions.listQuery}.
   */
  executeListQuery: GraphQLQueryFn<TQueryVars>;
  /**
   * Result object returned from Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook.
   * Contains query result, loading and error status and more, see {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery}
   * documentation for details.
   */
  listQueryResult: LazyQueryResult<TData, TQueryVars>;
}

export interface ListQueryVars {
  filter?: JmixEntityFilter;
  orderBy?: JmixSortOrder;
  limit?: number;
  offset?: number;
  loadItems?: boolean;
}

export function useEntityListData<
  TEntity,
  TData extends Record<string, any> = Record<string, any>,
  TListQueryVars = any
>({
  entityList,
  listQuery,
  listQueryOptions,
  filter,
  sortOrder,
  pagination,
  entityName,
  lazyLoading
}: EntityListDataHookOptions<TEntity, TData, TListQueryVars>): EntityListDataHookResult<TEntity, TData, TListQueryVars> {

  const optsWithVars = {
    variables: {
      filter,
      orderBy: sortOrder,
      limit: pagination?.pageSize,
      offset: calcOffset(pagination?.current, pagination?.pageSize),
    } as TListQueryVars & ListQueryVars,
    ...listQueryOptions
  };

  const [executeListQuery, listQueryResult] = useLazyQuery<TData, TListQueryVars>(listQuery, optsWithVars);

  // Load items
  useEffect(() => {
    // We execute the list query unless `entityList` has been passed directly.
    // We don't need relation options in this case as filters will be disabled.
    // If we implement client-side filtering then we'll need to obtain the relation options from backend.
    if (!lazyLoading && (entityList == null)) {
      executeListQuery();
    }
  }, [executeListQuery, lazyLoading, entityList]);

  const items = entityList == null
    ? listQueryResult.data?.[getListQueryName(entityName)]
    : getDisplayedItems(entityList, pagination, sortOrder, filter);

  const count = entityList == null
    ? listQueryResult.data?.[getCountQueryName(entityName)]
    : entityList.length;

  const relationOptions = getRelationOptions<TData>(entityName, listQueryResult.data);

  return {
    items,
    count,
    relationOptions,
    executeListQuery,
    listQueryResult
  }
}
