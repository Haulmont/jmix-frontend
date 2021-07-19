import {ListQueryVars, HasId} from "@haulmont/jmix-react-core";
import {useCallback} from "react";
import {useEntityList, EntityListHookOptions, EntityListHookResult} from "../../crud/list/useEntityList";
import {useLocalObservable} from 'mobx-react';
import {MultiTableStore} from "./MultiTableStore";
import {createDeleteMutationForSomeEntities} from "../../crud/list/util/createDeleteMutation";
import {useApolloClient} from "@apollo/client";
import { modals } from "../modals";
import { useIntl, IntlShape } from "react-intl";

function showConfirmDialog(
  onConfirm: () => void,
  intl: IntlShape,
  messageId: string,
) {
  modals.open({
    content: intl.formatMessage({id: messageId}),
    okText: intl.formatMessage({id: "common.ok"}),
    cancelText: intl.formatMessage({id: "common.cancel"}),
    onOk: onConfirm,
  });
}

export interface MultiTableHookOptions<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookOptions<TEntity, TData, TQueryVars, TMutationVars> {}

export interface MultiTableHookResult<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  multiTableStore: MultiTableStore;
}

export function useMultiTable<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars extends ListQueryVars = ListQueryVars,
  TMutationVars extends HasId = HasId
>(
  options: MultiTableHookOptions<TEntity, TData, TQueryVars, TMutationVars>
): MultiTableHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const entityListData = useEntityList(options);
  const client = useApolloClient();
  const multiTableStore = useLocalObservable(() => new MultiTableStore());
  const intl = useIntl();

  type EntityListHookResultType = EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars>;

  const handleSelectionChange: EntityListHookResultType['handleSelectionChange'] = useCallback(
    selectedEntityIds => multiTableStore.setSelectedEntityIds(selectedEntityIds),
    [multiTableStore]
  );

  const deleteSelectedEntities = useCallback(() => {
    if (multiTableStore.selectedEntityIds != null) {
      const entitiesDeleteMutate = createDeleteMutationForSomeEntities(options.entityName, multiTableStore.selectedEntityIds);
      client.mutate({mutation: entitiesDeleteMutate});
    }
  }, [options.entityName, multiTableStore.selectedEntityIds]);

  const handleDeleteBtnClick = useCallback(() => {
    if (
      multiTableStore.selectedEntityIds != null
      && multiTableStore.selectedEntityIds.length > 0
    ) {
      showConfirmDialog(
        deleteSelectedEntities,
        intl,
        'multiTable.areYouSure.delete',
      );
    }
  }, [deleteSelectedEntities, intl]);
  
  return {
    ...entityListData,
    multiTableStore,
    handleSelectionChange,
    handleDeleteBtnClick
  };
}
