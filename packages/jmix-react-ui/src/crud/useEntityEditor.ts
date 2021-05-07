import {useCallback, useEffect} from "react";
import {FormInstance, message} from "antd";
import {useLocalStore} from "mobx-react";
import {
  DocumentNode, FetchResult,
  LazyQueryHookOptions,
  LazyQueryResult,
  MutationHookOptions, MutationResult,
  TypedDocumentNode
} from "@apollo/client";
import {
  GraphQLMutationFn,
  GraphQLQueryFn,
  HasId,
  useMetadata,
  Metadata,
  Screens,
  IMultiScreenItem,
  redirect,
  dollarsToUnderscores
} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import {action} from "mobx";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";
import {useForm} from "antd/es/form/Form";
import {graphqlToAntForm} from "../formatters/graphqlToAntForm";
import {selectFormSuccessMessageId} from "../ui/form/Form";
import { useLoadEntityQuery } from "./useLoadEntityQuery";
import { useMutationEntity } from "./useMutationEntity";

export type EntityEditorStore = {
  globalErrors: string[];
};

export const useEntityEditorStore = () => {
  return useLocalStore(() => ({
    globalErrors: [],
  }));
};

export interface EntityEditorHookOptions<TData, TVariables> {
  loadQuery: DocumentNode | TypedDocumentNode;
  loadQueryOptions?: LazyQueryHookOptions<TData, TVariables>;
  upsertMutation: DocumentNode | TypedDocumentNode;
  upsertMutationOptions?: MutationHookOptions<TData, TVariables>;
  entityId?: string;
  queryName?: string;
  entityName: string;
  upsertInputName: string;
  updateResultName?: string;
  listQueryName?: string;
  routingPath: string;
  hasAssociations?: boolean;
  screens: Screens;
  multiScreen: IMultiScreenItem;
}

export interface EntityEditorHookResult<TEntity, TData, TVariables> {
  load: GraphQLQueryFn<TVariables>;
  loadQueryResult: LazyQueryResult<TData, TVariables>;
  upsertItem: GraphQLMutationFn<TData, TVariables>;
  upsertMutationResult: MutationResult;
  store: EntityEditorStore;
  form: FormInstance;
  intl: IntlShape;
  handleFinish: (values: TEntity) => void;
  handleFinishFailed: (errorInfo: ValidateErrorEntity<TEntity>) => void;
  handleCancelBtnClick: () => void;
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
    entityName,
    queryName = `${dollarsToUnderscores(entityName)}ById`,
    updateResultName = `upsert_${dollarsToUnderscores(entityName)}`,
    listQueryName = `${dollarsToUnderscores(entityName)}List`,
    upsertInputName,
    hasAssociations,
    routingPath,
    screens,
    multiScreen,
  } = options;

  const intl = useIntl();
  const metadata = useMetadata();
  const [form] = useForm();
  const store: EntityEditorStore = useEntityEditorStore();

  const [load, loadQueryResult] = useLoadEntityQuery<TData, TVariables>({
    entityId,
    loadQuery,
    loadQueryOptions,
    hasAssociations,
  })
  const {loading: queryLoading, error: queryError, data} = loadQueryResult;

  // Fill the form based on retrieved data
  useEffect(() => {
    if (
      entityId != null && // Editing an entity
      !queryLoading &&
      queryError == null &&
      data != null &&
      metadata != null
    ) {
      form.setFieldsValue(
        graphqlToAntForm<TEntity>(data[queryName], entityName, metadata)
      );
    }
  }, [form, queryLoading, queryError, data, metadata, queryName, entityName, entityId]);

  const goBackToBrowserScreen = useCallback(() => {
    if (screens.currentScreenIndex === 1) {
      redirect(routingPath);
    }
    screens.setActiveScreen(multiScreen.parent!, true);
  }, [screens, routingPath, multiScreen]);

  const handleCancelBtnClick = goBackToBrowserScreen;

  const [upsertItem, upsertMutationResult, handleUpsertMutationEntity] = useMutationEntity<TEntity, TData, TVariables>({
    upsertMutation,
    upsertMutationOptions,
    entityName,
    upsertInputName,
    updateResultName,
    listQueryName,
    entityId
  });

  const {handleFinish, handleFinishFailed} = useFormSubmitCallbacks<TEntity, TData>({
    intl,
    form,
    metadata,
    handleUpsertMutationEntity,
    entityId,
    goBackToBrowserScreen,
  });

  return {
    load,
    loadQueryResult,
    upsertItem,
    upsertMutationResult,
    store,
    form,
    intl,
    handleFinish,
    handleFinishFailed,
    handleCancelBtnClick,
  };
}

export interface FormSubmitCallbacksHookOptions<TEntity, TData> {
  intl: IntlShape;
  form: FormInstance;
  metadata: Metadata;
  handleUpsertMutationEntity: (values: TEntity) => Promise<FetchResult<TData>>;
  entityId?: string;
  goBackToBrowserScreen: () => void;
}

export interface FormSubmitCallbacksHookResult<TEntity> {
  handleFinish: (values: TEntity) => void;
  handleFinishFailed: (errorInfo: ValidateErrorEntity<TEntity>) => void;
}

export function useFormSubmitCallbacks<
  TEntity extends Record<string, any> = Record<string, any>,
  TData extends Record<string, any> = Record<string, any>
>(
  options: FormSubmitCallbacksHookOptions<TEntity, TData>
): FormSubmitCallbacksHookResult<TEntity> {
  const {
    intl,
    form,
    metadata,
    handleUpsertMutationEntity,
    entityId,
    goBackToBrowserScreen,
  } = options;

  const isNewEntity = (entityId == null);

  const handleFinishFailed = useCallback(() => {
    message.error(
      intl.formatMessage({ id: "management.editor.validationError" })
    );
  }, [intl]);

  const handleFinish = useCallback(
    (values: TEntity) => {
      if (form != null && metadata != null) {
        handleUpsertMutationEntity(values)
          .then(action(({errors}: FetchResult<TData, Record<string, any>, Record<string, any>>) => {
            if (errors == null || errors.length === 0) {
              const successMessageId = selectFormSuccessMessageId(
                isNewEntity ? "create" : "edit"
              );
              message.success(intl.formatMessage({ id: successMessageId }));
              goBackToBrowserScreen();
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
    [form, metadata, handleUpsertMutationEntity, isNewEntity, intl, goBackToBrowserScreen]
  );

  return {handleFinish, handleFinishFailed};
}
