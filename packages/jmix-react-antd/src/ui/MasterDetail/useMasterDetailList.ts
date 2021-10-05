import {ListQueryVars, HasId} from "@haulmont/jmix-react-core";
import {useCallback} from "react";
import {useEntityList, EntityListHookOptions, EntityListHookResult} from "@haulmont/jmix-react-web";
import { useMasterDetailStore } from "./MasterDetailContext";
import {modals} from "../modals";

export interface MasterDetailListHookOptions<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookOptions<TEntity, TData, TQueryVars, TMutationVars> {}

export interface MasterDetailListHookResult<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {}

export function useMasterDetailList<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars extends ListQueryVars = ListQueryVars,
  TMutationVars extends HasId = HasId
>(
  options: MasterDetailListHookOptions<TEntity, TData, TQueryVars, TMutationVars>
): MasterDetailListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const entityListData = useEntityList(options);

  const {intl} = entityListData;

  const masterDetailStore = useMasterDetailStore();

  type EntityListHookResultType = EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars>;

  const handleCreateBtnClick: EntityListHookResultType['handleCreateBtnClick'] = useCallback(
    () => {
      if (masterDetailStore.selectedEntityId != null) {
        modals.open({
          content: intl.formatMessage({id: 'masterDetail.create.ifEntitySelected'}),
          okText: intl.formatMessage({id: "common.ok"}),
          cancelText: intl.formatMessage({id: "common.cancel"}),
          onOk: () => {
            masterDetailStore.setIsOpenEditor(true);
            masterDetailStore.setSelectedEntityId(undefined);
          },
        });
      } else {
        masterDetailStore.setIsOpenEditor(true);
        masterDetailStore.setSelectedEntityId(undefined);
      }
    },
    [intl, masterDetailStore]
  );

  const handleSelectionChange: EntityListHookResultType['handleSelectionChange'] = useCallback(
    (selectedEntityIds) => {
      if (selectedEntityIds.length === 0) {
        if (masterDetailStore.dirty) {
          modals.open({
            content: intl.formatMessage({id: 'masterDetail.create.ifEntitySelected'}),
            okText: intl.formatMessage({id: "common.ok"}),
            cancelText: intl.formatMessage({id: "common.cancel"}),
            onOk: () => {
              masterDetailStore.setDirty(false);
              masterDetailStore.setIsOpenEditor(false);
              masterDetailStore.setSelectedEntityId(undefined);
            },
          });
        } else {
          masterDetailStore.setIsOpenEditor(false);
          masterDetailStore.setSelectedEntityId(undefined);
        }
      } else {
        if (masterDetailStore.dirty) {
          modals.open({
            content: intl.formatMessage({id: 'masterDetail.create.ifEntitySelected'}),
            okText: intl.formatMessage({id: "common.ok"}),
            cancelText: intl.formatMessage({id: "common.cancel"}),
            onOk: () => {
              masterDetailStore.setDirty(false);
              masterDetailStore.setIsOpenEditor(true);
              masterDetailStore.setSelectedEntityId(selectedEntityIds[0]);
            },
          });
        } else {
          masterDetailStore.setIsOpenEditor(true);
          masterDetailStore.setSelectedEntityId(selectedEntityIds[0]);
        }
      }

      entityListData.handleSelectionChange(selectedEntityIds);
    },
    [entityListData, intl, masterDetailStore]
  );
  
  return {
    ...entityListData,
    handleCreateBtnClick,
    handleSelectionChange,
  };
}
