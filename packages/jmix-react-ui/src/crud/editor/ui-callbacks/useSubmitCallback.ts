import {useCallback} from "react";
import {ant_to_jmixFront} from "../../../formatters/ant_to_jmixFront";
import {
  addIdIfExistingEntity,
  EntityInstance,
  Metadata,
  toIdString,
  useMetadata,
} from "@haulmont/jmix-react-core";
import { useIntl } from "react-intl";
import { GraphQLError } from "graphql";
import { ApolloError, FetchResult } from "@apollo/client";
import { message } from "antd";
import { useMessageFailedPersisted, useMessageSuccessPersisted } from "../util/usePersistEntity";

export interface SubmitCallbackHookOptions<TEntity, TData> {
  entityName: string;
  entityId?: string;
  entityInstance?: EntityInstance<TEntity>;
  persistEntity: (updatedEntity: TEntity) => Promise<FetchResult<TData, Record<string, any>, Record<string, any>>>;
  onCommit?: (value: EntityInstance<TEntity>) => void;
  onSuccessPersist?: (data?: TData | null) => void;
  onFailedPersist?: (errors?: readonly GraphQLError[]) => void;
  uiKit_to_jmixFront?: (item: any, entityName: string, metadata: Metadata, stringIdName?: string) => Record<string, any>;
}

export function useSubmitCallback<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
>({
  entityName,
  entityId,
  entityInstance,
  persistEntity,
  onCommit,
  onSuccessPersist = useMessageSuccessPersisted(entityId),
  onFailedPersist = useMessageFailedPersisted(),
  uiKit_to_jmixFront = ant_to_jmixFront
}: SubmitCallbackHookOptions<TEntity, TData>) {
  const metadata = useMetadata();
  const intl = useIntl();

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
            .then(({data, errors}) => {
              if (errors == null || errors.length === 0) {
                onSuccessPersist(data);
              } else {
                onFailedPersist(errors);
              }
            })
            .catch((e: Error | ApolloError) => {
              const constraintViolations = (e as ApolloError)
                ?.graphQLErrors
                ?.[0]
                ?.extensions
                ?.constraintViolations;
              if (constraintViolations != null) {
                return; // Bean validation error
              }

              console.error(e);
              message.error(intl.formatMessage({ id: "common.requestFailed" }));
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
      intl,
      metadata
    ]
  );
}