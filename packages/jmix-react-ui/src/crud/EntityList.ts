import {
  ApolloCache,
  DocumentNode,
  LazyQueryHookOptions,
  LazyQueryResult,
  MutationHookOptions, MutationResult, Reference,
  TypedDocumentNode, useLazyQuery, useMutation
} from "@apollo/client";
import {PaginationConfig} from "antd/es/pagination";
import {EntityInstance, GraphQLMutationFn, GraphQLQueryFn, HasId, Screens, redirect} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import {useCallback, useEffect} from "react";
import {Modal} from "antd";
import {referencesListByEntityName} from "../util/componentsRegistration";

export interface EntityListHookOptions<TData, TQueryVars, TMutationVars> {
  listQuery: DocumentNode | TypedDocumentNode;
  listQueryOptions?: LazyQueryHookOptions<TData, TQueryVars>;
  deleteMutation: DocumentNode | TypedDocumentNode;
  deleteMutationOptions?: MutationHookOptions<TData, TMutationVars>;
  screens: Screens;
  entityName: string;
  routingPath: string;
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
    screens,
    entityName,
    routingPath
  } = options;

  const intl = useIntl();

  const [loadItems, listQueryResult] = useLazyQuery<TData, TQueryVars>(listQuery, listQueryOptions);
  const [deleteItem, deleteMutationResult] = useMutation<TData, TMutationVars>(deleteMutation, deleteMutationOptions);

  // Load items
  useEffect(() => {
    loadItems(); // TODO pagination
  }, [loadItems]);

  const showDeletionDialog = useDeletionDialogCallback<TEntity, TData, TMutationVars>(intl, deleteItem);
  const handleCreateBtnClick = useCreateBtnCallback(screens, entityName);
  const handleEditBtnClick = useEditBtnCallbck(screens, entityName, routingPath);

  return {
    loadItems, listQueryResult, deleteItem, deleteMutationResult, intl, showDeletionDialog,
    handleCreateBtnClick, handleEditBtnClick
  };
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