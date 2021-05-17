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
import { HasId } from "../util/metadata";

export interface EntityListDataHookOptions<TEntity, TData, TQueryVars> {
  entityList?: Array<EntityInstance<TEntity>>;
  entityName: string;
  listQuery: DocumentNode | TypedDocumentNode;
  listQueryOptions?: LazyQueryHookOptions<TData, TQueryVars>;
  filter?: JmixEntityFilter;
  sortOrder?: JmixSortOrder;
  pagination?: JmixPagination;
}

export interface EntityListDataHookResult<TEntity, TData, TQueryVars> {
  items?: Array<EntityInstance<TEntity>>;
  count?: number;
  relationOptions?: Map<string, Array<EntityInstance<unknown, HasId>>>;
  executeListQuery: GraphQLQueryFn<TQueryVars>;
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
  TListQueryVars extends ListQueryVars = ListQueryVars,
>({
  entityList,
  listQuery,
  listQueryOptions,
  filter,
  sortOrder,
  pagination,
  entityName
}: EntityListDataHookOptions<TEntity, TData, TListQueryVars>): EntityListDataHookResult<TEntity, TData, TListQueryVars> {

  const optsWithVars = {
    variables: {
      filter,
      orderBy: sortOrder,
      limit: pagination?.pageSize,
      offset: calcOffset(pagination?.current, pagination?.pageSize),
      loadItems: entityList == null
    } as TListQueryVars,
    ...listQueryOptions
  };

  const [executeListQuery, listQueryResult] = useLazyQuery<TData, TListQueryVars>(listQuery, optsWithVars);

  // Load items
  useEffect(() => {
    executeListQuery(listQueryOptions);
  }, [listQueryOptions, executeListQuery]);

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


