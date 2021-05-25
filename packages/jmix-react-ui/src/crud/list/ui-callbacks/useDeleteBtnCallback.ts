import {IntlShape} from "react-intl";
import {useCallback} from "react";
import {showDeleteEntityDialog} from "../../showDeleteEntityDialog";
import {EntityInstance, GraphQLMutationFn, HasId} from "@haulmont/jmix-react-core";
import {ApolloCache, Reference} from "@apollo/client";
import { getEntityInstanceById } from "./getEntityInstanceById";

export function useDeleteBtnCallback<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TVariables extends HasId = HasId
>(
  intl: IntlShape,
  executeDeleteMutation: GraphQLMutationFn<TData, TVariables>,
  queryName: string,
  selectedEntityId?: string,
  items?: Array<EntityInstance<TEntity>>,
  entityList?: Array<EntityInstance<TEntity>>,
  onEntityListChange?: (entityList: Array<EntityInstance<TEntity>>) => void
) {
  return useCallback(
    () => {
      if (selectedEntityId != null && items != null) {
        const entityInstance = getEntityInstanceById(selectedEntityId, items);

        let onConfirm: () => void;

        if (entityList != null && onEntityListChange != null) {
          onConfirm = () => {
            onEntityListChange(
              entityList.filter(entity => entity.id !== entityInstance.id)
            );
          };
        } else {
          onConfirm = defaultOnConfirm(entityInstance as EntityInstance<TEntity, HasId>, executeDeleteMutation, queryName);
        }

        showDeleteEntityDialog(onConfirm, intl, entityInstance);
      }
    },
    [getEntityInstanceById,  selectedEntityId]
  );
}

function defaultOnConfirm<
  TEntity,
  TData,
  TVariables extends HasId = HasId
  >(
  entityInstance: EntityInstance<TEntity, HasId>,
  executeDeleteMutation: GraphQLMutationFn<TData, TVariables>,
  queryName: string
) {
  return () => {
    if (entityInstance.id != null) {
      // noinspection JSIgnoredPromiseFromCall
      executeDeleteMutation({
        variables: { id: entityInstance.id } as TVariables,
        update(cache: ApolloCache<TData>) {
          // Remove deleted item from cache
          cache.modify({
            fields: {
              [queryName](existingRefs, { readField }) {
                return existingRefs.filter(
                  (ref: Reference) => entityInstance.id !== readField("id", ref)
                );
              }
            }
          });
        }
      });
    }
  };
}
