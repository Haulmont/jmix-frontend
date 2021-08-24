import {jmixFront_to_jmixGraphQL} from "../../../formatters/jmixFront_to_jmixGraphQL";
import {ApolloCache, FetchResult, gql} from "@apollo/client";
import {GraphQLMutationFn, dollarsToUnderscores, useMetadata, MetaClassInfo, findEntityMetadata, unCapitalizeFirst} from "@haulmont/jmix-react-core";
import { useCallback } from "react";

export interface PersistEntityOptions<TData, TVariables> {
  upsertItem: GraphQLMutationFn<TData, TVariables>,
  updateResultName: string,
  listQueryName: string,
  entityName: string,
}

export function usePersistEntity<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TVariables = unknown
  >({
  upsertItem,
  updateResultName,
  listQueryName,
  entityName
}: PersistEntityOptions<TData, TVariables>) {
  const metadata = useMetadata();

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
  }, [metadata, upsertItem, updateResultName, listQueryName]);
}
