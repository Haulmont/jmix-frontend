import React, {RefObject, useCallback, useEffect} from "react";
import {FormInstance, message} from "antd";
import {useLocalStore} from "mobx-react";
import {
  DocumentNode, FetchResult,
  LazyQueryHookOptions,
  LazyQueryResult,
  MutationHookOptions, MutationResult,
  TypedDocumentNode, useLazyQuery, useMutation
} from "@apollo/client";
import {
  GraphQLMutationFn, GraphQLQueryFn, addIdIfExistingEntity, HasId, MainStore, useMainStore
} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import {MetaClassInfo} from "@haulmont/jmix-rest";
import {action, IObservableArray} from "mobx";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";
import {useForm} from "antd/es/form/Form";
import {graphqlToAntForm} from "../formatters/graphqlToAntForm";
import {selectFormSuccessMessageId} from "../ui/form/Form";

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
  upsertMutationOptions?: MutationHookOptions<TData, TVariables>;
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

export function useEntityEditor<
  TEntity,
  TData extends Record<string, any> = Record<string, any>,
  TVariables extends HasId = HasId
>(
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
  const [upsertItem, upsertMutationResult] = useMutation<TData, TVariables>(upsertMutation, upsertMutationOptions);

  // Fetch the entity from backend
  useEffect(() => {
    if (entityId != null && !isNewEntity) {
      loadItem({
        variables: {
          id: entityId
        } as unknown as TVariables
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
        graphqlToAntForm<TEntity>(data[queryName], entityName, mainStore.metadata)
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
        }).then(action(({errors}: FetchResult<TData, Record<string, any>, Record<string, any>>) => {
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
          .catch((e: Error) => {
            console.error(e);
            message.error(intl.formatMessage({ id: "common.requestFailed" }));
          });
      }
    },
    [entityId, isNewEntity, store, form, mainStore.metadata, store.updated, upsertItem, intl]
  );

  return {handleFinish, handleFinishFailed};
}
