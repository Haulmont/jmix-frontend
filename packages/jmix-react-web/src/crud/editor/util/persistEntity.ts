import {jmixFront_to_jmixGraphQL} from "../../../formatters/jmixFront_to_jmixGraphQL";
import {ApolloCache, ApolloError, FetchResult, gql} from "@apollo/client";
import {action} from "mobx";
import {GraphQLMutationFn, Metadata, dollarsToUnderscores} from "@haulmont/jmix-react-core";

export interface PersistEntityCallbacks {
  onCreate?: () => void;
  onEdit?: () => void;
  onError?: () => void;
}

export function persistEntity<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TVariables = unknown
  >(
  upsertItem: GraphQLMutationFn<TData, TVariables>,
  upsertInputName: string,
  updatedEntity: TEntity,
  updateResultName: string,
  listQueryName: string,
  entityName: string,
  isNewEntity: boolean,
  goToParentScreen: () => void,
  metadata: Metadata,
  persistEntityCallbacks?: PersistEntityCallbacks
) {
  upsertItem({
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
  }).then(action(({errors}: FetchResult<TData, Record<string, any>, Record<string, any>>) => {
    if (errors == null || errors.length === 0) {
      isNewEntity ? persistEntityCallbacks?.onCreate?.() : persistEntityCallbacks?.onEdit?.()
      goToParentScreen();
    } else {
      console.error(errors);
      persistEntityCallbacks?.onError?.();
    }
  }))
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
      persistEntityCallbacks?.onError?.();
    });
}
