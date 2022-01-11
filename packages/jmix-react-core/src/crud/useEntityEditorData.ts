import {editorQueryIncludesRelationOptions} from "../util/graphql";
import {DocumentNode, LazyQueryHookOptions, LazyQueryResult, TypedDocumentNode, useLazyQuery} from "@apollo/client";
import {useEffect} from "react";
import { EntityInstance } from "./EntityInstance";
import { HasId } from "../util/metadata";
import { dollarsToUnderscores } from "../util/dollars-to-underscores";
import {getRelationOptions} from "./getRelationOptions";
import { GraphQLQueryFn } from "../data/aliases";

export interface EntityEditorDataHookOptions<TEntity, TData, TQueryVars> {
  /**
   * GraphQL query that retrieves the entity instance.
   * Will be passed to Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook along with {@link loadQueryOptions}.
   */
  loadQuery: DocumentNode | TypedDocumentNode;
  /**
   * Options that will be passed to Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook along with {@link loadQuery}.
   */
  loadQueryOptions?: LazyQueryHookOptions<TData, TQueryVars>;
  /**
   * An entity instance with a given `id` will be loaded from backend unless {@link entityInstance} is also provided.
   */
  entityId?: string;
  /**
   * Use to provide the entity instance directly instead of obtaining it from backend.
   */
  entityInstance?: EntityInstance<TEntity>
  /**
   * Name of the entity being edited.
   */
  entityName: string;
  /**
   * Indicates that id needs to be omitted
   */
  cloneEntity?: boolean;
}

export interface EntityEditorDataHookResult<TEntity, TData, TQueryVars> {
  /**
   * Entity instance that will be displayed by the editor component.
   */
  item: EntityInstance<TEntity>;
  /**
   * Execute function returned from Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook.
   * A function that executes the {@link EntityEditorDataHookOptions.loadQuery}.
   */
  executeLoadQuery: GraphQLQueryFn<TQueryVars>;
  /**
   * Result object returned from Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook.
   * Contains query result, loading and error status and more, see {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery}
   * documentation for details.
   */
  loadQueryResult: LazyQueryResult<TData, TQueryVars>;
  /**
   * Used when the entity has relation (Association) attributes.
   * A map between child entity names and arrays of possible values.
   */
  relationOptions?: Map<string, Array<EntityInstance<unknown, HasId>>>;
}

export type LoadQueryVars = HasId & {
  loadItem?: boolean;
};

export function useEntityEditorData<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars extends LoadQueryVars = LoadQueryVars,
>({
  loadQuery,
  loadQueryOptions,
  entityInstance,
  entityId,
  entityName,
  cloneEntity
}: EntityEditorDataHookOptions<TEntity, TData, TQueryVars>): EntityEditorDataHookResult<TEntity, TData, TQueryVars> {

  const queryName = `${dollarsToUnderscores(entityName)}ById`;
  const hasAssociations = editorQueryIncludesRelationOptions(loadQuery);
  const loadItem = (entityInstance == null && entityId != null);

  const optsWithVars = {
    variables: {
      id: entityId,
      loadItem
    } as TQueryVars,
    ...loadQueryOptions
  };

  const [executeLoadQuery, loadQueryResult] = useLazyQuery<TData, TQueryVars>(loadQuery, optsWithVars);

  // Fetch the entity (if editing) and association options from backend
  useEffect(() => {
    if (loadItem || hasAssociations) {
      executeLoadQuery();
    }
  }, [loadItem, hasAssociations]);

  const {data} = loadQueryResult;
  let item = entityInstance != null
    ? entityInstance
    : data?.[queryName];

  if (cloneEntity && item != null) {
    item = {
      ...item,
      id: undefined
    }
  }

  const relationOptions = getRelationOptions<TData>(entityName, loadQueryResult.data, true);

  return {
    item,
    relationOptions,
    executeLoadQuery,
    loadQueryResult
  };
}
