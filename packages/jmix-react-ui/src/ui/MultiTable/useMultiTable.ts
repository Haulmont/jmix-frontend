import {ListQueryVars, HasId} from "@haulmont/jmix-react-core";
import {useCallback, useMemo} from "react";
import {useEntityList, EntityListHookOptions, EntityListHookResult} from "../../crud/list/useEntityList";
import {useLocalObservable} from 'mobx-react';
import { MultiTableStore } from "./MultiTableStore";
import { createDeleteMutationForSomeEntities } from "../../crud/list/util/createDeleteMutation";
import { useMutation } from "@apollo/client";

export interface MultiTableHookOptions<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookOptions<TEntity, TData, TQueryVars, TMutationVars> {}

export interface MultiTableHookResult<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {}

export function useMultiTable<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars extends ListQueryVars = ListQueryVars,
  TMutationVars extends HasId = HasId
>(
  options: MultiTableHookOptions<TEntity, TData, TQueryVars, TMutationVars>
): MultiTableHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const entityListData = useEntityList(options);

  const masterDetailStore = useLocalObservable(() => new MultiTableStore());

  type EntityListHookResultType = EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars>;

  const handleSelectionChange: EntityListHookResultType['handleSelectionChange'] = useCallback(
    selectedEntityIds => masterDetailStore.setSelectedEntityIds(selectedEntityIds),
    [masterDetailStore]
  );
  
  const deleteMutation = useMemo(
    () => createDeleteMutationForSomeEntities(options.entityName, masterDetailStore.selectedEntityIds || []),
    [options.entityName, masterDetailStore.selectedEntityIds],
  );
  
  const [executeDeleteMutation, deleteMutationResult] = useMutation<TData, TMutationVars>(deleteMutation);

  const handleDeleteBtnClick = useCallback(() => {
    executeDeleteMutation();
  }, [executeDeleteMutation]);
  
  return {
    ...entityListData,
    handleSelectionChange,
    executeDeleteMutation,
    deleteMutationResult,
    handleDeleteBtnClick
  };
}
