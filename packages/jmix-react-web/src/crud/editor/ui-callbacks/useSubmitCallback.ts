import {useCallback} from "react";
import {
  addIdIfExistingEntity,
  EntityInstance,
  findEntityMetadata,
  GraphQLMutationFn,
  Metadata,
  toIdString,
  useMetadata,
  unCapitalizeFirst,
  MetaClassInfo
} from "@haulmont/jmix-react-core";
import { PersistEntityCallbacks, persistEntity } from "../util/persistEntity";

export interface SubmitCallbackHookOptions<TEntity, TData, TMutationVars> {
  executeUpsertMutation: GraphQLMutationFn<TData, TMutationVars>;
  updateResultName: string;
  listQueryName: string;
  entityName: string;
  goToParentScreen: () => void;
  entityId?: string;
  entityInstance?: EntityInstance<TEntity>;
  onCommit?: (value: EntityInstance<TEntity>) => void;
  uiKit_to_jmixFront: (item: any, entityName: string, metadata: Metadata, stringIdName?: string) => Record<string, any>;
  persistEntityCallbacks?: PersistEntityCallbacks
}

export function useSubmitCallback<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TMutationVars = unknown
>({
  executeUpsertMutation,
  updateResultName,
  listQueryName,
  entityName,
  goToParentScreen,
  entityId,
  entityInstance,
  onCommit,
  persistEntityCallbacks,
  uiKit_to_jmixFront
}: SubmitCallbackHookOptions<TEntity, TData, TMutationVars>) {
  const metadata = useMetadata();
  const isNewEntity = (entityId == null);

  return useCallback(
    (values: any) => {
      if (metadata != null) {
        // TODO perform client-side validation

        if (onCommit != null) {
          const id = entityInstance?.id != null
            ? toIdString(entityInstance.id)
            : undefined;
          const updatedEntity = {
            ...uiKit_to_jmixFront(values, entityName, metadata),
            ...addIdIfExistingEntity(id)
          };
          onCommit(updatedEntity as TEntity);
          goToParentScreen();
        } else {
          const updatedEntity = {
            ...uiKit_to_jmixFront(values, entityName, metadata),
            ...addIdIfExistingEntity(entityId)
          };

          const entityMetadata: MetaClassInfo | undefined = findEntityMetadata(entityName, metadata);
          if (entityMetadata == null) {
            console.error('Cannot find entity metadata for ' + entityName);
            return;
          }
          const upsertInputName = unCapitalizeFirst(entityMetadata.className);

          persistEntity(
            executeUpsertMutation,
            upsertInputName,
            updatedEntity,
            updateResultName,
            listQueryName,
            entityName,
            isNewEntity,
            goToParentScreen,
            metadata,
            persistEntityCallbacks
          );
        }
      }
    },
    [
      metadata,
      onCommit,
      entityInstance,
      entityName,
      goToParentScreen,
      executeUpsertMutation,
      updateResultName,
      listQueryName,
      entityName,
      isNewEntity,
      goToParentScreen,
      metadata
    ]
  );
}