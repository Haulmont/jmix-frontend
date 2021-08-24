import {useCallback} from "react";
import {
  addIdIfExistingEntity,
  EntityInstance,
  Metadata,
  toIdString,
  useMetadata,
} from "@haulmont/jmix-react-core";
import { ApolloError, FetchResult } from "@apollo/client";
import {GraphQLError} from 'graphql';

export interface SubmitCallbackCallbacks<TEntity, TData> {
  onCommit?: (entityInstance: EntityInstance<TEntity>) => void;
  onCreate?: (data?: TData | null) => void;
  onEdit?: (data?: TData | null) => void;
  onError?: (errors?: readonly GraphQLError[]) => void;
  onApolloError?: (error: Error | ApolloError) => void;
}

export interface SubmitCallbackHookOptions<TEntity, TData> {
  persistEntity: (updatedEntity: TEntity) => Promise<FetchResult<TData, Record<string, any>, Record<string, any>>>;
  entityName: string;
  entityId?: string;
  entityInstance?: EntityInstance<TEntity>;
  onCommit?: (value: EntityInstance<TEntity>) => void;
  onCreate?: (data?: TData | null) => void;
  onEdit?: (data?: TData | null) => void;
  onError?: (errors?: readonly GraphQLError[]) => void;
  onApolloError?: (error: Error | ApolloError) => void;
  uiKit_to_jmixFront: (item: any, entityName: string, metadata: Metadata, stringIdName?: string) => Record<string, any>;
}

export function useSubmitCallback<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>
>({
  persistEntity,
  entityName,
  entityId,
  entityInstance,
  onCommit,
  uiKit_to_jmixFront,
  onCreate,
  onEdit,
  onError,
  onApolloError,
}: SubmitCallbackHookOptions<TEntity, TData>) {
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
        } else {
          const updatedEntity = {
            ...uiKit_to_jmixFront(values, entityName, metadata),
            ...addIdIfExistingEntity(entityId)
          };

          persistEntity(updatedEntity as TEntity)
            .then(({errors}: FetchResult<TData, Record<string, any>, Record<string, any>>) => {
              if (errors == null || errors.length === 0) {
                if (isNewEntity) {
                  onCreate?.();
                } else {
                  onEdit?.();
                }
              } else {
                onError?.();
              }
            })
            .catch((error: Error | ApolloError) => {
              const constraintViolations = (error as ApolloError)
                ?.graphQLErrors
                ?.[0]
                ?.extensions
                ?.constraintViolations;
              if (constraintViolations != null) {
                return; // Bean validation error
              }

              onApolloError?.(error);
            });
        }
      }
    },
    [
      metadata,
      onCommit,
      entityInstance,
      entityName,
      entityName,
      isNewEntity,
      metadata,
    ]
  );
}