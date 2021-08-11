import { LoadQueryVars } from "@haulmont/jmix-react-core";
import { useCallback, useEffect } from "react";
import { useSubmitCallback } from "../../crud/editor/ui-callbacks/useSubmitCallback";
import { useEntityEditor, EntityEditorHookOptions, EntityEditorHookResult } from "../../crud/editor/useEntityEditor";
import { useMessageSuccessPersisted } from "../../crud/editor/util/usePersistEntity";
import { useMasterDetailStore } from "./MasterDetailContext";

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
        entityId,
        entityName,
        entityInstance,
        onCommit,
        resetEntityEditorForm,
    } = options;

    const entityEditorData = useEntityEditor<TEntity, TData, TQueryVars, TMutationVars>(options);

    const {executeLoadQuery, persistEntity} = entityEditorData;

    const masterDetailStore = useMasterDetailStore();
    
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

    const messageSuccessPersisted = useMessageSuccessPersisted(entityId);

    const cancelEditor = useCallback(() => {
        masterDetailStore.setIsOpenEditor(false);
        masterDetailStore.setSelectedEntityId(undefined);
        messageSuccessPersisted();
    }, [masterDetailStore]);

    const handleSubmit = useSubmitCallback<TEntity>({
        entityName,
        entityId: masterDetailStore.selectedEntityId,
        entityInstance,
        onCommit,
        persistEntity,
        onSuccessPersist: cancelEditor
    });

    return {
        ...entityEditorData,
        handleSubmit,
        handleCancelBtnClick: cancelEditor,
    };
}
