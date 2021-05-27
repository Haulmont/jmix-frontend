import {useCallback} from "react";
import {ant_to_jmixFront} from "../../../formatters/ant_to_jmixFront";
import {addIdIfExistingEntity, EntityInstance, GraphQLMutationFn, toIdString, useMetadata } from "@haulmont/jmix-react-core";
import { useIntl } from "react-intl";
import { persistEntity } from "../util/persistEntity";

export interface SubmitCallbackHookOptions<TEntity, TData, TMutationVars> {
  executeUpsertMutation: GraphQLMutationFn<TData, TMutationVars>;
  upsertInputName: string;
  updateResultName: string;
  listQueryName: string;
  entityName: string;
  goToParentScreen: () => void;
  entityId?: string;
  entityInstance?: EntityInstance<TEntity>;
  onCommit?: (value: EntityInstance<TEntity>) => void;
}

export function useSubmitCallback<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TMutationVars = unknown
>({
  executeUpsertMutation,
  upsertInputName,
  updateResultName,
  listQueryName,
  entityName,
  goToParentScreen,
  entityId,
  entityInstance,
  onCommit,
}: SubmitCallbackHookOptions<TEntity, TData, TMutationVars>) {
  const metadata = useMetadata();
  const isNewEntity = (entityId == null);
  const intl = useIntl();

  return useCallback(
    (values: { [field: string]: any }) => {
      if (metadata != null) {
        // TODO perform client-side validation

        if (onCommit != null) {
          const id = entityInstance?.id != null
            ? toIdString(entityInstance.id)
            : undefined;
          const updatedEntity = {
            ...ant_to_jmixFront(values, entityName, metadata),
            ...addIdIfExistingEntity(id)
          };
          onCommit(updatedEntity as TEntity);
          goToParentScreen();
        } else {
          const updatedEntity = {
            ...ant_to_jmixFront(values, entityName, metadata),
            ...addIdIfExistingEntity(entityId)
          };
          persistEntity(
            executeUpsertMutation,
            upsertInputName,
            updatedEntity,
            updateResultName,
            listQueryName,
            entityName,
            isNewEntity,
            goToParentScreen,
            intl,
            metadata
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
      upsertInputName,
      updateResultName,
      listQueryName,
      entityName,
      isNewEntity,
      goToParentScreen,
      intl,
      metadata
    ]
  );
}