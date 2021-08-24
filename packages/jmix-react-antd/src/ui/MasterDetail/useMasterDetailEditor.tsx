import { LoadQueryVars } from "@haulmont/jmix-react-core";
import { useEffect } from "react";
import { 
    useEntityEditor, 
    EntityEditorHookOptions, 
    EntityEditorHookResult,
} from "@haulmont/jmix-react-web";
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
    const {resetEntityEditorForm} = options;

    const masterDetailStore = useMasterDetailStore();

    const entityEditorData = useEntityEditor<TEntity, TData, TQueryVars, TMutationVars>({
        ...options,
        entityId: masterDetailStore.selectedEntityId
    });

    const {executeLoadQuery} = entityEditorData;

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

    return entityEditorData;
}
