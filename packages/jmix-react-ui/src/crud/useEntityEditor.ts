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
  dollarsToUnderscores,
  MayHaveId,
  EntityInstance
} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import {action} from "mobx";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";
import {useForm} from "antd/es/form/Form";
import {graphqlToAntForm} from "../formatters/graphqlToAntForm";
import {selectFormSuccessMessageId} from "../ui/form/Form";
import {antFormToGraphQL} from "../formatters/antFormToGraphQL";
import { useParentScreen } from "../util/screen";

export type EntityEditorStore = {
  globalErrors: string[];
};

export const useEntityEditorStore = () => {
  return useLocalStore(() => ({
    globalErrors: [],
  }));
};

export interface EntityEditorHookOptions<TEntity, TData, TVariables> {
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
  screens: Screens; // TODO remove
  multiScreen: IMultiScreenItem; // TODO remove
  onCommit?: (value: TEntity) => void;
  entityInstance?: TEntity
}

export interface EntityEditorHookResult<TEntity, TData, TVariables> {
  item: EntityInstance<TEntity>;
  executeLoadQuery: GraphQLQueryFn<TVariables>;
  loadQueryResult: LazyQueryResult<TData, TVariables>;
  executeUpsertMutation: GraphQLMutationFn<TData, TVariables>;
  upsertMutationResult: MutationResult;
  store: EntityEditorStore;
  form: FormInstance;
  intl: IntlShape;
  handleFinish: (values: TEntity) => void;
  handleFinishFailed: (errorInfo: ValidateErrorEntity<TEntity>) => void;
  handleCancelBtnClick: () => void;
}

export function useEntityEditor<
  TEntity extends MayHaveId = MayHaveId,
  TData extends Record<string, any> = Record<string, any>,
  TVariables extends HasId = HasId
>(
  options: EntityEditorHookOptions<TEntity, TData, TVariables>
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
    onCommit,
    entityInstance
  } = options;

  const intl = useIntl();
  const metadata = useMetadata();
  const [form] = useForm();
  const store: EntityEditorStore = useEntityEditorStore();

  const [executeLoadQuery, loadQueryResult] = useLazyQuery<TData, TVariables>(loadQuery, loadQueryOptions);
  const {data} = loadQueryResult;

  const [executeUpsertMutation, upsertMutationResult] = useMutation<TData, TVariables>(upsertMutation, upsertMutationOptions);

  // Fetch the entity (if editing) and association options from backend
  useEffect(() => {
    if (entityId != null || hasAssociations) {
      executeLoadQuery({
        variables: {
          id: entityId,
          loadItem: entityInstance == null && entityId != null
        } as unknown as TVariables
      });
    }
  }, [entityId, executeLoadQuery, hasAssociations, entityInstance]);

  const item = entityInstance != null
    ? entityInstance
    : data?.[queryName];

  // Fill the form based on retrieved data
  useEffect(() => {
    if (item != null && metadata != null) {
      console.log('-- IN form', item);
      console.log('-- IN form after ant-formatting', graphqlToAntForm<TEntity>(item, entityName, metadata));

      form.setFieldsValue(
        graphqlToAntForm<TEntity>(item, entityName, metadata)
      );
    }
  }, [form, item, metadata, entityName]);

  const goToParentScreen = useParentScreen(routingPath);

  const handleCancelBtnClick = goToParentScreen;

  const {handleFinish, handleFinishFailed} = useFormSubmitCallbacks<TEntity, TData, TVariables>({
    intl,
    form,
    metadata,
    executeUpsertMutation,
    entityName,
    upsertInputName,
    entityId,
    store,
    goToParentScreen,
    updateResultName,
    listQueryName,
    onCommit
  });

  return {
    item,
    executeLoadQuery,
    loadQueryResult,
    executeUpsertMutation,
    upsertMutationResult,
    store,
    form,
    intl,
    handleFinish,
    handleFinishFailed,
    handleCancelBtnClick,
  };
}

export interface FormSubmitCallbacksHookOptions<TEntity, TData, TVariables> {
  intl: IntlShape;
  form: FormInstance;
  metadata: Metadata;
  executeUpsertMutation: GraphQLMutationFn<TData, TVariables>;
  entityId?: string;
  entityName: string;
  upsertInputName: string;
  store: EntityEditorStore;
  goToParentScreen: () => void;
  updateResultName: string;
  listQueryName: string;
  onCommit?: (value: TEntity) => void;
}

export interface FormSubmitCallbacksHookResult<TEntity> {
  handleFinish: (values: TEntity) => void;
  handleFinishFailed: (errorInfo: ValidateErrorEntity<TEntity>) => void;
}

export function useFormSubmitCallbacks<
  TEntity extends MayHaveId = MayHaveId,
  TData extends Record<string, any> = Record<string, any>,
  TVariables extends HasId = HasId
>(
  options: FormSubmitCallbacksHookOptions<TEntity, TData, TVariables>
): FormSubmitCallbacksHookResult<TEntity> {
  const {
    intl,
    form,
    metadata,
    executeUpsertMutation,
    entityName,
    upsertInputName,
    entityId,
    store,
    goToParentScreen,
    updateResultName,
    listQueryName,
    onCommit
  } = options;

  const isNewEntity = (entityId == null);

  const handleFinishFailed = useCallback(() => {
    message.error(
      intl.formatMessage({ id: "management.editor.validationError" })
    );
  }, [intl]);

  const handleFinish = useCallback(
    (values: { [field: string]: any }) => {
      // console.log('-- FROM form', values);

      if (form != null && metadata != null) {
        const updatedEntity = {
          ...antFormToGraphQL(values, entityName, metadata),
          ...addIdIfExistingEntity(entityId)
        };

        // TODO perform client-side validation

        if (onCommit != null) {
          onCommit(updatedEntity as TEntity);
          goToParentScreen();
        } else {
          persistEntity(
            executeUpsertMutation,
            upsertInputName,
            updatedEntity,
            updateResultName,
            listQueryName,
            entityName,
            isNewEntity,
            goToParentScreen,
            intl
          );
        }
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
      executeUpsertMutation,
      intl,
      updateResultName,
      listQueryName,
      onCommit,
      goToParentScreen
    ]
  );

  return {handleFinish, handleFinishFailed};
}

export function persistEntity<
  TEntity extends MayHaveId = MayHaveId,
  TData extends Record<string, any> = Record<string, any>,
  TVariables extends HasId = HasId
>(
  upsertItem: GraphQLMutationFn<TData, TVariables>,
  upsertInputName: string,
  updatedEntity: TEntity,
  updateResultName: string,
  listQueryName: string,
  entityName: string,
  isNewEntity: boolean,
  goToParentScreen: () => void,
  intl: IntlShape
) {
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
      goToParentScreen();
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
