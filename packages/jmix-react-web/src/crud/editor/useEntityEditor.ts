import {useLocalObservable} from "mobx-react";
import {
  DocumentNode,
  FetchResult,
  LazyQueryHookOptions,
  LazyQueryResult,
  MutationHookOptions,
  MutationResult,
  TypedDocumentNode,
  useMutation
} from "@apollo/client";
import {
  GraphQLMutationFn,
  GraphQLQueryFn,
  HasId,
  dollarsToUnderscores,
  EntityInstance,
  useEntityEditorData,
  Metadata
} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import { SubmitCallbackCallbacks, useSubmitCallback } from "./ui-callbacks/useSubmitCallback";
import {useMultiScreen} from "../../ui/MultiScreen";
import {extractBeanValidationErrors} from "./validation/extractBeanValidationErrors";
import {JmixServerValidationErrors} from "../../common/JmixServerValidationErrors";
import { useNoop } from "../../util/useNoop";
import { usePersistEntity } from "./util/usePersistEntity";
import { useCallback } from "react";

export type EntityEditorState = {
  globalErrors: string[];
};

export const useEntityEditorStore = () => {
  return useLocalObservable(() => ({
    globalErrors: [],
  }));
};

export interface EntityEditorCallbacks<TEntity, TData> extends SubmitCallbackCallbacks<TEntity, TData> {
  onCloseForm?: () => void;
}

export interface EntityEditorHookOptions<TEntity, TData, TQueryVars, TMutationVars> {
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
   * GraphQL mutation that UPdates or inSERTs (creates) an entity instance (updates if `id` is provided and creates otherwise).
   * Will be passed to Apollo Client `useMutation` hook along with {@link upsertMutationOptions}.
   */
  upsertMutation: DocumentNode | TypedDocumentNode;
  /**
   * Options that will be passed to Apollo Client `useMutation` hook along with {@link upsertMutation}.
   */
  upsertMutationOptions?: MutationHookOptions<TData, TMutationVars>;
  /**
   * An entity instance with a given `id` will be loaded from backend unless {@link entityInstance} is also provided.
   */
  entityId?: string;
  /**
   * Name of the entity being edited.
   */
  entityName: string;
  /**
   * A callback that will be executed when the editor is submitted.
   * @param entityInstance
   */
  onCommit?: (entityInstance: EntityInstance<TEntity>) => void;
  /**
   * Use to provide the entity instance directly instead of obtaining it from backend.
   */
  entityInstance?: EntityInstance<TEntity>
  /**
   * A hook that is responsible for putting the entity instance data ({@link item}) into the UI form.
   *
   * When using Ant Design `<Form>` create an implementation of this hook by passing a `FormInstance` to {@link createUseAntdForm} factory function.
   *
   * When using a different form (e.g. a custom UI kit)  you may provide your own implementation of this hook,
   * though it might be more convenient to omit it entirely
   * and fill your form outside of `useEntityEditor` hook using the entity instance data returned from it
   * ({@link EntityEditorHookResult.item}).
   *
   * @param item
   * @param entityName
   */
  useEntityEditorForm?: (item: EntityInstance<TEntity>, entityName: string) => void;
  /**
   * A hook that is responsible for putting the server validation errors info into the UI form.
   *
   * When using Ant Design `<Form>` create an implementation of this hook by passing a `FormInstance` to {@link createUseAntdFormValidation} factory function.
   *
   * When using a different form (e.g. a custom UI kit)  you may provide your own implementation of this hook,
   * though it might be more convenient to omit it entirely
   * and use {@link EntityEditorHookResult.serverValidationErrors} object returned from the `useEntityEditor` hook.
   * If you need the original `ApolloError` it is accessible as {@link EntityEditorHookResult.upsertMutationResult}`.error`.
   *
   * @param errorInfo
   */
  useEntityEditorFormValidation?: (errorInfo?: JmixServerValidationErrors) => void;
  /**
   * Pass when using a form different from Ant Design `<Form>`.
   * A function that reformats the entity data received from the form
   * into internal UI kit agnostic format of Jmix frontend.
   *
   * @param item entity data received from the form.
   * @param entityName
   * @param metadata
   * @param stringIdName when entity has a String `id` - name of the `id` attribute.
   */
  uiKit_to_jmixFront: (item: any, entityName: string, metadata: Metadata, stringIdName?: string) => Record<string, any>;
  callbacks?: EntityEditorCallbacks<TEntity, TData>;
}

export interface EntityEditorHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  /**
   * Entity instance that will be displayed by the editor component.
   */
  item: EntityInstance<TEntity>;
  serverValidationErrors?: JmixServerValidationErrors;
  /**
   * Used when the entity has relation (Association) attributes.
   * A map between child entity names and arrays of possible values.
   */
  relationOptions?: Map<string, Array<EntityInstance<unknown, HasId>>>;
  /**
   * Execute function returned from Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook.
   * A function that executes the {@link EntityEditorHookOptions.loadQuery}.
   */
  executeLoadQuery: GraphQLQueryFn<TQueryVars>;
  /**
   * Result object returned from Apollo Client {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery} hook.
   * Contains query result, loading and error status and more, see {@link https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery | useLazyQuery}
   * documentation for details.
   */
  loadQueryResult: LazyQueryResult<TData, TQueryVars>;
  /**
   * Execute function returned from Apollo Client {@link https://www.apollographql.com/docs/react/data/mutations/ | useMutation} hook.
   * A function that executes the {@link EntityEditorHookOptions.upsertMutation}.
   */
  executeUpsertMutation: GraphQLMutationFn<TData, TMutationVars>;
  /**
   * Result object returned  from Apollo Client {@link https://www.apollographql.com/docs/react/data/mutations/ | useMutation} hook.
   * Contains mutation result, loading and error status and more, see {@link https://www.apollographql.com/docs/react/data/mutations/ | useMutation}
   * documentation for details.
   */
  upsertMutationResult: MutationResult;
  /**
   * Observable state
   */
  entityEditorState: EntityEditorState;
  /**
   * `react-intl` {@link https://formatjs.io/docs/react-intl/api/#the-intl-object | intl object}.
   */
  intl: IntlShape;
  /**
   * A callback that will be executed when the entity is persisted.
   * @param upsertInputName
   * @param updatedEntity
   */
  persistEntity: (updatedEntity: TEntity) => Promise<FetchResult<TData, Record<string, any>, Record<string, any>>>;
  /**
   * A callback that will be executed when the editor is submitted.
   * @param entityInstance
   */
  handleSubmit: (entityInstance: EntityInstance<TEntity>) => void;
  /**
   * A callback that will be executed when the editor is closed without submitting.
   */
  handleCancelBtnClick: () => void;
}

export function useEntityEditor<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars extends HasId = HasId,
  TMutationVars = unknown
>(
  options: EntityEditorHookOptions<TEntity, TData, TQueryVars, TMutationVars>
): EntityEditorHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const multiScreen = useMultiScreen();

  const {
    loadQuery,
    loadQueryOptions,
    upsertMutation,
    upsertMutationOptions,
    entityId = multiScreen?.params?.entityId,
    entityName,
    entityInstance,
    useEntityEditorForm = useNoop,
    useEntityEditorFormValidation = useNoop,
    uiKit_to_jmixFront,
    callbacks
  } = options;

  const intl = useIntl();

  const updateResultName = `upsert_${dollarsToUnderscores(entityName)}`;
  const listQueryName = `${dollarsToUnderscores(entityName)}List`;

  const entityEditorState: EntityEditorState = useEntityEditorStore();

  const {
    item,
    relationOptions,
    executeLoadQuery,
    loadQueryResult
  } = useEntityEditorData({
    loadQuery,
    loadQueryOptions,
    entityInstance,
    entityId,
    entityName
  });

  useEntityEditorForm(item, entityName);

  const [executeUpsertMutation, upsertMutationResult] = useMutation<TData, TMutationVars>(upsertMutation, upsertMutationOptions);

  const serverValidationErrors = extractBeanValidationErrors(upsertMutationResult.error);

  useEntityEditorFormValidation(serverValidationErrors);

  const persistEntity = usePersistEntity({
    upsertItem: executeUpsertMutation,
    updateResultName,
    entityName,
    listQueryName,
  });

  const handleSubmit = useSubmitCallback({
    persistEntity,
    entityName,
    entityId,
    entityInstance,
    uiKit_to_jmixFront,
    onCommit: callbacks?.onCommit,
    onCreate: callbacks?.onCreate,
    onEdit: callbacks?.onEdit,
    onError: callbacks?.onError,
    onApolloError: callbacks?.onApolloError,
  });

  const handleCancelBtnClick = useCallback(() => {
    callbacks?.onCloseForm?.()
  }, [callbacks?.onCloseForm]);

  return {
    item,
    serverValidationErrors,
    relationOptions,
    executeLoadQuery,
    loadQueryResult,
    executeUpsertMutation,
    upsertMutationResult,
    entityEditorState,
    intl,
    persistEntity,
    handleSubmit,
    handleCancelBtnClick,
  };
}
