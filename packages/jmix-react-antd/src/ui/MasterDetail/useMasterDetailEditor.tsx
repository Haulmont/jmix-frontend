import { dollarsToUnderscores, LoadQueryVars } from "@haulmont/jmix-react-core";
import { useCallback, useEffect } from "react";
import { 
    useEntityEditor, 
    EntityEditorHookOptions, 
    EntityEditorHookResult,
    useSubmitCallback 
} from "@haulmont/jmix-react-web";
import { useMasterDetailStore } from "./MasterDetailContext";
import { ant_to_jmixFront } from "../../formatters/ant_to_jmixFront";

export interface EntityMasterDetailEditorookOptions<TEntity, TData, TQueryVars, TMutationVars>
extends EntityEditorHookOptions<TEntity, TData, TQueryVars, TMutationVars> {
  resetEntityEditorForm: () => void;
}

export interface EntityMasterDetailEditorHookResult<TEntity, TData, TQueryVars, TMutationVars>
extends EntityEditorHookResult<TEntity, TData, TQueryVars, TMutationVars> {}

export function useMasterDetailEditor<
    TEntity = unknown,
    TData extends Record<string, any> = Record<string, any>,
    TQueryVars extends LoadQueryVars = LoadQueryVars,
    TMutationVars = unknown
>(
    options: EntityMasterDetailEditorookOptions<TEntity, TData, TQueryVars, TMutationVars>
): EntityMasterDetailEditorHookResult<TEntity, TData, TQueryVars, TMutationVars> {
    const {
        entityName,
        entityInstance,
        onCommit,
        resetEntityEditorForm,
    } = options;

    const entityEditorData = useEntityEditor<TEntity, TData, TQueryVars, TMutationVars>(options);

    const {executeLoadQuery, executeUpsertMutation} = entityEditorData;

    const masterDetailStore = useMasterDetailStore();

    const updateResultName = `upsert_${dollarsToUnderscores(entityName)}`;
    const listQueryName = `${dollarsToUnderscores(entityName)}List`;
    
    // Watch at masterDetailStore.selectedEntityId changes. If masterDetailStore.selectedEntityId exists, then load the entity. Otherwise reset the form
    useEffect(() => {
        if (masterDetailStore.selectedEntityId != null) {
            executeLoadQuery({
                variables: {
                    id: masterDetailStore.selectedEntityId,
                    loadItem: true
                } as TQueryVars,
            });
        } else {
            resetEntityEditorForm();
        }
    }, [executeLoadQuery, masterDetailStore.selectedEntityId]);

    const goToParentScreen = useCallback(() => {
        masterDetailStore.setIsOpenEditor(false);
        masterDetailStore.setSelectedEntityId(undefined);
    }, [masterDetailStore]);

    const handleSubmit = useSubmitCallback({
        executeUpsertMutation,
        updateResultName,
        listQueryName,
        entityName,
        goToParentScreen,
        entityId: masterDetailStore.selectedEntityId,
        entityInstance,
        uiKit_to_jmixFront: ant_to_jmixFront,
        onCommit,
    });

    return {
        ...entityEditorData,
        handleSubmit,
        handleCancelBtnClick: goToParentScreen,
    };
}
