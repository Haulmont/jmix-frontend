import {PaginationConfig} from "antd/es/pagination";
import React, {RefObject, useCallback, useEffect} from "react";
import {message, Modal} from "antd";
import {Reference} from "@apollo/client";
import {IntlShape} from "react-intl";
import {addIdIfExistingEntity, EntityInstance, GraphQLMutation, GraphQLQuery} from "./jmix-react-core";
import {MainStore} from "@haulmont/jmix-react-core";
import {FormInstance} from "antd/es/form";
import {ApolloError} from "@apollo/client/errors";
import {useLocalStore} from "mobx-react";
import {graphqlToAntForm, selectFormSuccessMessageId} from "@haulmont/jmix-react-ui";
import {Car} from "../../../jmix/entities/scr$Car";
import {IObservableArray} from "mobx";
import {MetaClassInfo} from "@haulmont/jmix-rest";

// Contents of this file will be moved to jmix-react-ui lib

export interface EntityCollectionHookOptions {
  loadItems: GraphQLQuery,
  paginationConfig: PaginationConfig
}

export const useEntityCollection = (options: EntityCollectionHookOptions) => {
  const {loadItems, paginationConfig} = options;

  useEffect(() => {
    loadItems({
      variables: toLimitAndOffset(paginationConfig)
    });
  }, [paginationConfig, loadItems]);
};

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

export interface EntityInstanceHookOptions<T> {
  entityId: string;
  loadItem: GraphQLQuery;
  isNewEntity: boolean;
  formRef: RefObject<FormInstance>,
  queryLoading: boolean;
  queryError: ApolloError | undefined;
  data: T | undefined;
  metadata: IObservableArray<MetaClassInfo> | null;
  queryName: string;
  entityName: string;
}

export const useEntityInstance = <T extends unknown>(
  options: EntityInstanceHookOptions<T>
) => {
  const {
    entityId,
    loadItem,
    isNewEntity,
    formRef,
    queryLoading,
    queryError,
    data,
    metadata,
    queryName,
    entityName
  } = options;

  // Fetch the entity from backend
  useEffect(() => {
    if (entityId != null && !isNewEntity) {
      loadItem({
        variables: {
          id: entityId
        }
      });
    }
  }, [options.entityId, options.loadItem, options.isNewEntity]);

  // Fill the form based on retrieved data
  useEffect(() => {
    if (
      formRef.current != null &&
      !queryLoading &&
      queryError == null &&
      data != null &&
      metadata != null
    ) {
      formRef.current.setFieldsValue(
        graphqlToAntForm<Car>(data[queryName], entityName, metadata)
      );
    }
  }, [formRef.current, queryLoading, queryError, data, metadata, queryName, entityName]);
};

export interface FormSubmitCallbacksHookOptions {
  intl: IntlShape;
  form: FormInstance;
  mainStore: MainStore;
  upsertItem: GraphQLMutation;
  entityId: string;
  isNewEntity: boolean;
  store: EntityEditorStore;
}

export const useFormSubmitCallbacks = (options: FormSubmitCallbacksHookOptions) => {
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
          }
        })
          .then(({ errors }) => {
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
          })
          .catch(e => {
            console.error(e);
            message.error(intl.formatMessage({ id: "common.requestFailed" }));
          });
      }
    },
    [entityId, form, mainStore.metadata, store.updated, upsertItem, intl]
  );

  return [handleFinish, handleFinishFailed];
};

export const useDeletionDialogCallback = <T extends unknown>(
  intl: IntlShape,
  deleteMutation: GraphQLMutation
) => {
  return useCallback(
    (e: EntityInstance<T>) => {
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
              variables: { id: e.id },
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
};

export function toLimitAndOffset(
  paginationConfig: PaginationConfig
): { limit: number | undefined; offset: number | undefined } {
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