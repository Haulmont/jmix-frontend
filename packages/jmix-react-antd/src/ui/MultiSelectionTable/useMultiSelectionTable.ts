import {ListQueryVars, HasId} from "@haulmont/jmix-react-core";
import {useCallback} from "react";
import {
  useEntityList, 
  EntityListHookOptions, 
  EntityListHookResult,
  createDeleteMutationForSomeEntities
} from "@haulmont/jmix-react-web";
import {useLocalObservable} from 'mobx-react';
import {MultiSelectionTableStore} from "./MultiSelectionTableStore";
import {useApolloClient} from "@apollo/client";
import {modals} from "../modals";
import {useIntl} from "react-intl";
import {message} from "antd";

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
        message.success(intl.formatMessage({id: 'multiSelectionTable.delete.success'}));
        await entityListData.executeListQuery();
      } catch (error) {
        message.error(intl.formatMessage({id: 'multiSelectionTable.delete.error'}));
      }
    }
  }, [multiSelectionTableStore.selectedEntityIds, options.entityName, client, intl, entityListData]);

  const handleDeleteBtnClick = useCallback(() => {
    if (
      multiSelectionTableStore.selectedEntityIds != null
      && multiSelectionTableStore.selectedEntityIds.length > 0
    ) {
      modals.open({
        content: intl.formatMessage({id: 'multiSelectionTable.delete.areYouSure'}),
        okText: intl.formatMessage({id: "common.ok"}),
        cancelText: intl.formatMessage({id: "common.cancel"}),
        onOk: deleteSelectedEntities,
      });
    }
  }, [deleteSelectedEntities, intl, multiSelectionTableStore.selectedEntityIds]);
  
  return {
    ...entityListData,
    multiSelectionTableStore,
    handleSelectionChange,
    handleDeleteBtnClick
  };
}
