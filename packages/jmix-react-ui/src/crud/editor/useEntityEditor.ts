import {useEffect} from "react";
import {FormInstance} from "antd";
import {useLocalObservable} from "mobx-react";
import {
  DocumentNode,
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
  useMetadata,
  dollarsToUnderscores,
  EntityInstance,
  useEntityEditorData
} from "@haulmont/jmix-react-core";
import {IntlShape, useIntl} from "react-intl";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";
import {useForm} from "antd/es/form/Form";
import {jmixFront_to_ant} from "../../formatters/jmixFront_to_ant";
import { useParentScreen } from "../../util/screen";
import { useSubmitCallback } from "./ui-callbacks/useSubmitCallback";
import { useSubmitFailedCallback } from "./ui-callbacks/useSubmitFailedCallback";
import {useMultiScreen} from "../../ui/MultiScreen";

export type EntityEditorState = {
  globalErrors: string[];
};

export const useEntityEditorStore = () => {
  return useLocalObservable(() => ({
    globalErrors: [],
  }));
};

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
   * Base route path.
   */
  routingPath: string;
  /**
   * Name of the variable in the upsert mutation - uncapitalized entity class name.
   */
  // TODO add class name to metadata and obtain upsertInput name from there; remove it from options.
  // TODO https://github.com/Haulmont/jmix-frontend/issues/329
  upsertInputName: string;
  /**
   * A callback that will be executed when the editor is submitted.
   * @param entityInstance
   */
  onCommit?: (entityInstance: EntityInstance<TEntity>) => void;
  /**
   * Use to provide the entity instance directly instead of obtaining it from backend.
   */
  entityInstance?: EntityInstance<TEntity>
}

export interface EntityEditorHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  /**
   * Entity instance that will be displayed by the editor component.
   */
  item: EntityInstance<TEntity>;
  /**
   * Used when the entity has relation (Association) attributes.
   * A map between child entity names and arrays of possible values.
   */
  relationOptions?: Map<string, Array<EntityInstance<unknown, HasId>>>;
  /**
   *
   */
  executeLoadQuery: GraphQLQueryFn<TQueryVars>;
  loadQueryResult: LazyQueryResult<TData, TQueryVars>;
  executeUpsertMutation: GraphQLMutationFn<TData, TMutationVars>;
  upsertMutationResult: MutationResult;
  entityEditorState: EntityEditorState;
  form: FormInstance;
  intl: IntlShape;
  handleSubmit: (values: TEntity) => void;
  handleSubmitFailed: (errorInfo: ValidateErrorEntity<TEntity>) => void;
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
    routingPath,
    onCommit,
    entityInstance,
    upsertInputName
  } = options;

  const intl = useIntl();
  const metadata = useMetadata();
  const [form] = useForm();

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

  // Fill the form based on retrieved data
  useEffect(() => {
    if (item != null && metadata != null) {
      form.setFieldsValue(
        jmixFront_to_ant<TEntity>(item, entityName, metadata)
      );
    }
  }, [form, item, metadata, entityName]);

  const [executeUpsertMutation, upsertMutationResult] = useMutation<TData, TMutationVars>(upsertMutation, upsertMutationOptions);

  const goToParentScreen = useParentScreen(routingPath);

  const handleCancelBtnClick = goToParentScreen;

  const handleSubmit = useSubmitCallback({
    executeUpsertMutation,
    upsertInputName,
    updateResultName,
    listQueryName,
    form,
    entityName,
    goToParentScreen,
    entityId,
    entityInstance,
    onCommit,
  });

  const handleSubmitFailed = useSubmitFailedCallback();

  return {
    item,
    relationOptions,
    executeLoadQuery,
    loadQueryResult,
    executeUpsertMutation,
    upsertMutationResult,
    entityEditorState,
    form,
    intl,
    handleSubmit,
    handleSubmitFailed,
    handleCancelBtnClick,
  };
}
