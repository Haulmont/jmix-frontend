import {
  ApolloCache,
  DocumentNode,
  LazyQueryHookOptions,
  LazyQueryResult,
  MutationHookOptions, MutationResult, Reference,
  TypedDocumentNode, useLazyQuery, useMutation
} from "@apollo/client";
import {PaginationConfig} from "antd/es/pagination";
import {EntityInstance, GraphQLMutationFn, GraphQLQueryFn, HasId} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import {useCallback, useEffect} from "react";
import {Modal} from "antd";

export interface EntityListHookOptions<TData, TQueryVars, TMutationVars> {
  listQuery: DocumentNode | TypedDocumentNode,
  listQueryOptions?: LazyQueryHookOptions<TData, TQueryVars>,
  deleteMutation: DocumentNode | TypedDocumentNode,
  deleteMutationOptions?: MutationHookOptions<TData, TMutationVars>,
  paginationConfig: PaginationConfig
}

export interface EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  loadItems: GraphQLQueryFn<TQueryVars>,
  listQueryResult: LazyQueryResult<TData, TQueryVars>,
  deleteItem: GraphQLMutationFn<TData, TMutationVars>,
  deleteMutationResult: MutationResult,
  intl: IntlShape;
  showDeletionDialog: (e: EntityInstance<TEntity>) => void;
}

export function useEntityList<
  TEntity,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars extends LimitAndOffset = LimitAndOffset,
  TMutationVars extends HasId = HasId
>(
  options: EntityListHookOptions<TData, TQueryVars, TMutationVars>
): EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const {
    listQuery,
    listQueryOptions,
    deleteMutation,
    deleteMutationOptions,
    paginationConfig
  } = options;

  const intl = useIntl();

  const [loadItems, listQueryResult] = useLazyQuery<TData, TQueryVars>(listQuery, listQueryOptions);
  const [deleteItem, deleteMutationResult] = useMutation<TData, TMutationVars>(deleteMutation, deleteMutationOptions);

  // Load items
  useEffect(() => {
    loadItems({
      variables: toLimitAndOffset(paginationConfig) as TQueryVars
    });
  }, [paginationConfig, loadItems]);

  const showDeletionDialog = useDeletionDialogCallback<TEntity, TData, TMutationVars>(intl, deleteItem);

  return {
    loadItems, listQueryResult, deleteItem, deleteMutationResult, intl, showDeletionDialog
  };
}

export function useDeletionDialogCallback<
  TEntity,
  TData extends Record<string, any> = Record<string, any>,
  TVariables extends HasId = HasId,
  >(
  intl: IntlShape,
  deleteMutation: GraphQLMutationFn<TData, TVariables>
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
                    scr_CarList(existingRefs, { readField }) {
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

export type LimitAndOffset = { limit: number | undefined; offset: number | undefined };

export function toLimitAndOffset(
  paginationConfig: PaginationConfig
): LimitAndOffset {
  const { disabled, current, pageSize } = paginationConfig;

  if (disabled) {
    return {
      limit: undefined,
      offset: undefined
    };
  }

  if (pageSize != null && current != null) {
    return {
      limit: pageSize,
      offset: pageSize * (current - 1)
    };
  }

  return {
    limit: undefined,
    offset: undefined
  };
}