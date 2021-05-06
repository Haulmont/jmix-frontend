import {useCallback, useEffect} from "react";
import {FormInstance, message} from "antd";
import {useLocalStore} from "mobx-react";
import {
  ApolloCache,
  DocumentNode, FetchResult,
  gql,
  LazyQueryHookOptions,
  LazyQueryResult,
  MutationHookOptions, MutationResult,
  TypedDocumentNode, useLazyQuery, useMutation
} from "@apollo/client";
import {
  GraphQLMutationFn,
  GraphQLQueryFn,
  addIdIfExistingEntity,
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
import {antFormToGraphQL} from "../formatters/antFormToGraphQL";

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

  const [load, loadQueryResult] = useLazyQuery<TData, TVariables>(loadQuery, loadQueryOptions);
  const {loading: queryLoading, error: queryError, data} = loadQueryResult;

  const [upsertItem, upsertMutationResult] = useMutation<TData, TVariables>(upsertMutation, upsertMutationOptions);

  // Fetch the entity (if editing) and association options from backend
  useEffect(() => {
    if (entityId != null || hasAssociations) {
      load({
        variables: {
          id: entityId,
          loadItem: entityId != null
        } as unknown as TVariables
      });
    }
  }, [entityId, load, hasAssociations]);

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

  const {handleFinish, handleFinishFailed} = useFormSubmitCallbacks<TEntity, TData, TVariables>({
    intl,
    form,
    metadata,
    upsertItem,
    entityName,
    upsertInputName,
    entityId,
    store,
    goBackToBrowserScreen,
    updateResultName,
    listQueryName,
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

export interface FormSubmitCallbacksHookOptions<TData, TVariables> {
  intl: IntlShape;
  form: FormInstance;
  metadata: Metadata;
  upsertItem: GraphQLMutationFn<TData, TVariables>;
  entityId?: string;
  entityName: string;
  upsertInputName: string;
  store: EntityEditorStore;
  goBackToBrowserScreen: () => void;
  updateResultName: string;
  listQueryName: string;
}

export interface FormSubmitCallbacksHookResult<TEntity> {
  handleFinish: (values: TEntity) => void;
  handleFinishFailed: (errorInfo: ValidateErrorEntity<TEntity>) => void;
}

export function useFormSubmitCallbacks<
  TEntity,
  TData extends Record<string, any> = Record<string, any>,
  TVariables extends HasId = HasId
>(
  options: FormSubmitCallbacksHookOptions<TData, TVariables>
): FormSubmitCallbacksHookResult<TEntity> {
  const {
    intl,
    form,
    metadata,
    upsertItem,
    entityName,
    upsertInputName,
    entityId,
    store,
    goBackToBrowserScreen,
    updateResultName,
    listQueryName,
  } = options;

  const isNewEntity = (entityId == null);

  const handleFinishFailed = useCallback(() => {
    message.error(
      intl.formatMessage({ id: "management.editor.validationError" })
    );
  }, [intl]);

  const handleFinish = useCallback(
    (values: { [field: string]: any }) => {
      if (form != null && metadata != null) {
        const updatedEntity = {
          ...antFormToGraphQL(values, entityName, metadata),
          ...addIdIfExistingEntity(entityId)
        };
        upsertItem({
          variables: {
            [upsertInputName]: updatedEntity
          } as any,
          update(cache: ApolloCache<TData>, result: FetchResult<TData>) {
            const updateResult = result.data?.[updateResultName];
            // Reflect the update in Apollo cache
            cache.modify({
              fields: {
                [listQueryName](existingRefs = []) {
                  const updatedItemRef = cache.writeFragment({
                    id: `${entityName}:${updateResult.id}`,
                    data: updatedEntity,
                    fragment: gql(`
                      fragment New_${dollarsToUnderscores(entityName)} on ${dollarsToUnderscores(entityName)} {
                        id
                        type
                      }
                    `)
                  });
                  return [...existingRefs, updatedItemRef];
                }
              }
            });
          }
        }).then(action(({errors}: FetchResult<TData, Record<string, any>, Record<string, any>>) => {
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
    [
      entityId,
      entityName,
      upsertInputName,
      isNewEntity,
      store,
      form,
      metadata,
      upsertItem,
      intl,
      updateResultName,
      listQueryName,
    ]
  );

  return {handleFinish, handleFinishFailed};
}
