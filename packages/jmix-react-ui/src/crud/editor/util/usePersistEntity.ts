import {useIntl} from "react-intl";
import {useCallback} from 'react';
import {jmixFront_to_jmixGraphQL} from "../../../formatters/jmixFront_to_jmixGraphQL";
import {ApolloCache, FetchResult, gql} from "@apollo/client";
import {selectFormSuccessMessageId} from "../../../ui/form/Form";
import {message} from "antd";
import {GraphQLMutationFn, dollarsToUnderscores, useMetadata, findEntityMetadata, MetaClassInfo, unCapitalizeFirst} from "@haulmont/jmix-react-core";
import { GraphQLError } from "graphql";

export const useMessageSuccessPersisted = (entityId?: string) => {
  const intl = useIntl();
  
  return useCallback(() => {
    const isNewEntity = (entityId == null);
    const successMessageId = selectFormSuccessMessageId(
      isNewEntity ? "create" : "edit"
    );
    message.success(intl.formatMessage({ id: successMessageId }));
  }, [intl, entityId]);
}

export const useMessageFailedPersisted = () => {
  const intl = useIntl();

  return useCallback((errors?: readonly GraphQLError[]) => {
    console.error(errors);
    message.error(intl.formatMessage({ id: "common.requestFailed" }));
  }, [intl]);
}

interface PersistEntityOptions<
  TData extends Record<string, any> = Record<string, any>,
  TVariables = unknown
> {
  upsertItem: GraphQLMutationFn<TData, TVariables>;
  updateResultName: string;
  listQueryName: string;
  entityName: string;
  entityId?: string;
};

export function usePersistEntity<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TVariables = unknown
>(options: PersistEntityOptions<TData, TVariables>) {
  const {
    upsertItem,
    updateResultName,
    listQueryName,
    entityName,
    entityId,
  } = options;

  const metadata = useMetadata();
  const intl = useIntl();

  return useCallback((updatedEntity: TEntity) => {
      const entityMetadata: MetaClassInfo | undefined = findEntityMetadata(entityName, metadata);
      if (entityMetadata == null) {
        console.error('Cannot find entity metadata for ' + entityName);
        return Promise.reject('Cannot find entity metadata for ' + entityName);
      }
      const upsertInputName = unCapitalizeFirst(entityMetadata.className);

      return upsertItem({
        variables: {
          [upsertInputName]: jmixFront_to_jmixGraphQL(updatedEntity, entityName, metadata)
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
      })
    },
    [
      upsertItem,
      updateResultName,
      listQueryName,
      entityName,
      entityId,
      intl,
      metadata,
    ],
  );
}
