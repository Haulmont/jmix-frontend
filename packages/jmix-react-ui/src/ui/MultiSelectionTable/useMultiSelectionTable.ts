import {ListQueryVars, HasId} from "@haulmont/jmix-react-core";
import {useCallback} from "react";
import {useEntityList, EntityListHookOptions, EntityListHookResult} from "../../crud/list/useEntityList";
import {useLocalObservable} from 'mobx-react';
import {MultiSelectionTableStore} from "./MultiSelectionTableStore";
import {createDeleteMutationForSomeEntities} from "../../crud/list/util/createDeleteMutation";
import {useApolloClient} from "@apollo/client";
import {modals} from "../modals";
import {useIntl, IntlShape} from "react-intl";
import {message} from "antd";

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

export interface MultiSelectionTableHookOptions<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookOptions<TEntity, TData, TQueryVars, TMutationVars> {}

export interface MultiSelectionTableHookResult<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  multiSelectionTableStore: MultiSelectionTableStore;
}

export function useMultiSelectionTable<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars extends ListQueryVars = ListQueryVars,
  TMutationVars extends HasId = HasId
>(
  options: MultiSelectionTableHookOptions<TEntity, TData, TQueryVars, TMutationVars>
): MultiSelectionTableHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const entityListData = useEntityList(options);
  const client = useApolloClient();
  const multiSelectionTableStore = useLocalObservable(() => new MultiSelectionTableStore());
  const intl = useIntl();

  type EntityListHookResultType = EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars>;

  const handleSelectionChange: EntityListHookResultType['handleSelectionChange'] = useCallback(
    selectedEntityIds => multiSelectionTableStore.setSelectedEntityIds(selectedEntityIds),
    [multiSelectionTableStore]
  );

  const deleteSelectedEntities = useCallback(async () => {
    if (multiSelectionTableStore.selectedEntityIds != null) {
      const entitiesDeleteMutate = createDeleteMutationForSomeEntities(options.entityName, multiSelectionTableStore.selectedEntityIds);
      try {
        await client.mutate({mutation: entitiesDeleteMutate});
        message.success('multiSelectionTable.delete.success');
        await entityListData.executeListQuery();
      } catch (error) {
        message.error('multiSelectionTable.delete.error');
      }
    }
  }, [options.entityName, multiSelectionTableStore.selectedEntityIds]);

  const handleDeleteBtnClick = useCallback(() => {
    if (
      multiSelectionTableStore.selectedEntityIds != null
      && multiSelectionTableStore.selectedEntityIds.length > 0
    ) {
      showConfirmDialog(
        deleteSelectedEntities,
        intl,
        'multiSelectionTable.delete.areYouSure',
      );
    }
  }, [deleteSelectedEntities, intl]);
  
  return {
    ...entityListData,
    multiSelectionTableStore,
    handleSelectionChange,
    handleDeleteBtnClick
  };
}
