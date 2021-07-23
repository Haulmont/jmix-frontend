import {dollarsToUnderscores, LoadQueryVars} from "@haulmont/jmix-react-core";
import { useCallback, useEffect } from "react";
import { 
    useEntityEditor, 
    EntityEditorHookOptions, 
    EntityEditorHookResult,
    useSubmitCallback 
} from "@haulmont/jmix-react-web";
import { useMasterDetailStore } from "./MasterDetailContext";
import { ant_to_jmixFront } from "../../formatters/ant_to_jmixFront";
import {useChangeConfirm} from "./useChangeConfirm";
import { notifications, NotificationType } from "../notifications";
import { useIntl } from "react-intl";

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
        resetEntityEditorForm,
        onCommit,
    } = options;

    const intl = useIntl();

    const {setPristine} = useChangeConfirm();

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

    const closeEditor = useCallback(() => {
        masterDetailStore.setDirty(false);
        masterDetailStore.setIsOpenEditor(false);
        masterDetailStore.setSelectedEntityId(undefined);
    }, [masterDetailStore]);

    const onCreate = useCallback(() => {
        notifications.show({
            type: NotificationType.SUCCESS,
            description: intl.formatMessage({ id: "management.editor.created" })
          })
        setPristine();
    }, [notifications, intl, setPristine]);

    const onEdit = useCallback(() => {
        notifications.show({
            type: NotificationType.SUCCESS,
            description: intl.formatMessage({ id: "management.editor.updated" })
        })
        setPristine();
    }, [notifications, intl, setPristine]);

    const onError = useCallback(() => {
        notifications.show({
            type: NotificationType.ERROR,
            description: intl.formatMessage({ id: "common.requestFailed" })
        })
    }, [notifications, intl]);

    const handleSubmit = useSubmitCallback({
        executeUpsertMutation,
        updateResultName,
        listQueryName,
        entityName,
        goToParentScreen: closeEditor,
        entityId: masterDetailStore.selectedEntityId,
        entityInstance,
        uiKit_to_jmixFront: ant_to_jmixFront,
        onCommit,
        persistEntityCallbacks: {
            onCreate,
            onEdit,
            onError,
        }
    });

    return {
        ...entityEditorData,
        handleSubmit,
        handleCancelBtnClick: closeEditor,
    };
}
