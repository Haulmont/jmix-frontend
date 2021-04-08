import {PaginationConfig} from "antd/es/pagination";
import React, {RefObject, useCallback, useEffect} from "react";
import {message, Modal} from "antd";
import {LazyQueryHookOptions, LazyQueryResult, MutationHookOptions, MutationResult, Reference, useLazyQuery, useMutation} from "@apollo/client";
import {IntlShape, useIntl} from "react-intl";
import {addIdIfExistingEntity, EntityInstance, GraphQLMutationFn, GraphQLQueryFn } from "./jmix-react-core";
import {MainStore, useMainStore} from "@haulmont/jmix-react-core";
import {FormInstance} from "antd/es/form";
import {useLocalStore} from "mobx-react";
import {graphqlToAntForm, selectFormSuccessMessageId} from "@haulmont/jmix-react-ui";
import {Car} from "../../../jmix/entities/scr$Car";
import {action, IObservableArray} from "mobx";
import {MetaClassInfo} from "@haulmont/jmix-rest";
import {DocumentNode} from "graphql";
import {TypedDocumentNode} from "@graphql-typed-document-node/core";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";
import {useForm} from "antd/es/form/Form";

// Contents of this file will be moved to jmix-react-ui lib

export interface EntityListHookOptions<TData, TVariables> {
  listQuery: DocumentNode | TypedDocumentNode,
  listQueryOptions?: LazyQueryHookOptions<TData, TVariables>,
  deleteMutation: DocumentNode | TypedDocumentNode,
  deleteMutationOptions?: MutationHookOptions,
  paginationConfig: PaginationConfig
}

export interface EntityListHookResult<TEntity, TData, TVariables> {
  loadItems: GraphQLQueryFn<TVariables>,
  listQueryResult: LazyQueryResult<TData, TVariables>,
  deleteItem: GraphQLMutationFn<TData, TVariables>,
  deleteMutationResult: MutationResult,
  intl: IntlShape;
  showDeletionDialog: (e: EntityInstance<TEntity>) => void;
}

export function useEntityList<TEntity, TData = any, TVariables extends LimitAndOffset = LimitAndOffset>(
  options: EntityListHookOptions<TData, TVariables>
): EntityListHookResult<TEntity, TData, TVariables> {
  const {
    listQuery,
    listQueryOptions,
    deleteMutation,
    deleteMutationOptions,
    paginationConfig
  } = options;

  const intl = useIntl();

  const [loadItems, listQueryResult] = useLazyQuery<TData, TVariables>(listQuery, listQueryOptions);
  const [deleteItem, deleteMutationResult] = useMutation(deleteMutation, deleteMutationOptions);

  // Load items
  useEffect(() => {
    loadItems({
      variables: toLimitAndOffset(paginationConfig) as TVariables
    });
  }, [paginationConfig, loadItems]);

  const showDeletionDialog = useDeletionDialogCallback(intl, deleteItem);

  return {
    loadItems, listQueryResult, deleteItem, deleteMutationResult, intl, showDeletionDialog
  };
}

export type EntityEditorStore = {
  updated: boolean;
  globalErrors: string[];
  formRef: RefObject<FormInstance<any>>;
};

export const useEntityEditorStore = () => {
  return useLocalStore(() => ({
    updated: false,
    globalErrors: [],
    formRef: React.createRef<FormInstance<any>>()
  }));
};

export interface EntityEditorHookOptions<TData, TVariables> {
  loadQuery: DocumentNode | TypedDocumentNode;
  loadQueryOptions?: LazyQueryHookOptions<TData, TVariables>;
  upsertMutation: DocumentNode | TypedDocumentNode;
  upsertMutationOptions?: MutationHookOptions;
  entityId: string;
  isNewEntity: boolean;
  queryName: string;
  entityName: string;
}

export interface EntityEditorHookResult<TEntity, TData, TVariables> {
  loadItem: GraphQLQueryFn<TVariables>;
  loadQueryResult: LazyQueryResult<TData, TVariables>;
  upsertItem: GraphQLMutationFn<TData, TVariables>;
  upsertMutationResult: MutationResult;
  store: EntityEditorStore;
  form: FormInstance;
  intl: IntlShape;
  handleFinish: (values: TEntity) => void;
  handleFinishFailed: (errorInfo: ValidateErrorEntity<TEntity>) => void;
  metadata: IObservableArray<MetaClassInfo> | null;
}

export function useEntityEditor<TEntity, TData = any, TVariables extends HasId = HasId>(
  options: EntityEditorHookOptions<TData, TVariables>
): EntityEditorHookResult<TEntity, TData, TVariables> {
  const {
    loadQuery,
    loadQueryOptions,
    upsertMutation,
    upsertMutationOptions,
    entityId,
    isNewEntity,
    queryName,
    entityName
  } = options;

  const intl = useIntl();
  const mainStore = useMainStore();
  const [form] = useForm();
  const store: EntityEditorStore = useEntityEditorStore();

  const [loadItem, loadQueryResult] = useLazyQuery<TData, TVariables>(loadQuery, loadQueryOptions);
  const {loading: queryLoading, error: queryError, data} = loadQueryResult;
  const [upsertItem, upsertMutationResult] = useMutation(upsertMutation, upsertMutationOptions);

  // Fetch the entity from backend
  useEffect(() => {
    if (entityId != null && !isNewEntity) {
      loadItem({
        variables: {
          id: entityId
        } as TVariables
      });
    }
  }, [entityId, loadItem, isNewEntity]);

  // Fill the form based on retrieved data
  useEffect(() => {
    if (
      store.formRef.current != null &&
      !queryLoading &&
      queryError == null &&
      data != null &&
      mainStore.metadata != null
    ) {
      store.formRef.current.setFieldsValue(
        graphqlToAntForm<Car>(data[queryName], entityName, mainStore.metadata)
      );
    }
  }, [store.formRef.current, queryLoading, queryError, data, mainStore.metadata, queryName, entityName]);

  const {handleFinish, handleFinishFailed} = useFormSubmitCallbacks<TEntity, TData, TVariables>({
    intl,
    form,
    mainStore,
    upsertItem,
    entityId,
    isNewEntity,
    store
  });

  return {
    loadItem,
    loadQueryResult,
    upsertItem,
    upsertMutationResult,
    store,
    form,
    intl,
    handleFinish,
    handleFinishFailed,
    metadata: mainStore.metadata
  };
}

export interface FormSubmitCallbacksHookOptions<TData, TVariables> {
  intl: IntlShape;
  form: FormInstance;
  mainStore: MainStore;
  upsertItem: GraphQLMutationFn<TData, TVariables>;
  entityId: string;
  isNewEntity: boolean;
  store: EntityEditorStore;
}

export interface FormSubmitCallbacksHookResult<TEntity> {
  handleFinish: (values: TEntity) => void;
  handleFinishFailed: (errorInfo: ValidateErrorEntity<TEntity>) => void;
}

export function useFormSubmitCallbacks<TEntity, TData, TVariables>(
  options: FormSubmitCallbacksHookOptions<TData, TVariables>
): FormSubmitCallbacksHookResult<TEntity> {
  const {
    intl,
    form,
    mainStore,
    upsertItem,
    entityId,
    isNewEntity,
    store
  } = options;

  const handleFinishFailed = useCallback(() => {
    message.error(
      intl.formatMessage({ id: "management.editor.validationError" })
    );
  }, [intl]);

  const handleFinish = useCallback(
    (values: { [field: string]: any }) => {
      if (form != null && mainStore.metadata != null) {
        upsertItem({
          variables: {
            car: {
              ...values,
              ...addIdIfExistingEntity(entityId, isNewEntity)
            }
          } as any
        })
          .then(action(({ errors }) => {
            if (errors == null || errors.length === 0) {
              const successMessageId = selectFormSuccessMessageId(
                isNewEntity ? "create" : "edit"
              );
              message.success(intl.formatMessage({ id: successMessageId }));
              store.updated = true;
            } else {
              console.error(errors);
              message.error(intl.formatMessage({ id: "common.requestFailed" }));
            }
          }))
          .catch(e => {
            console.error(e);
            message.error(intl.formatMessage({ id: "common.requestFailed" }));
          });
      }
    },
    [entityId, form, mainStore.metadata, store.updated, upsertItem, intl]
  );

  return {handleFinish, handleFinishFailed};
};

// TODO Deprecate WithId and replace with HasId/MayHaveId
export type HasId = {id: string};

export function useDeletionDialogCallback<TEntity, TData = any, TVariables extends HasId = HasId>(
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
              update(cache) {
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