import {
    HasId,
    useMetadata,
} from "@haulmont/jmix-react-core";
import { 
    useEntityEditor, 
    EntityEditorHookOptions, 
    EntityEditorHookResult,  
} from "@haulmont/jmix-react-web";
import {jmixFront_to_ant} from "./../../formatters/jmixFront_to_ant";
import { useFormWizard } from "./FormWizardContext";
import {useCallback, useEffect} from 'react';

export interface EntityEditorFormWizardHookOptions<TEntity, TData, TQueryVars, TMutationVars>
extends EntityEditorHookOptions<TEntity, TData, TQueryVars, TMutationVars> {}

export interface EntityEditorFromWizardHookResult<TEntity, TData, TQueryVars, TMutationVars>
extends EntityEditorHookResult<TEntity, TData, TQueryVars, TMutationVars> {
    handleSelectStep: (stepIndex: number) => void;
    handleNextStep: () => void;
    handlePreviousStep: () => void;
    handleSubmitBtn: () => void;
}

export function useEntityEditorFromWizard<
    TEntity = unknown,
    TData extends Record<string, any> = Record<string, any>,
    TQueryVars extends HasId = HasId,
    TMutationVars = unknown
>(
    options: EntityEditorFormWizardHookOptions<TEntity, TData, TQueryVars, TMutationVars>
): EntityEditorFromWizardHookResult<TEntity, TData, TQueryVars, TMutationVars> {
    const metadata = useMetadata();
    const entityEditorData = useEntityEditor(options);
    const {formWizardStore, formWizardHelpersRef} = useFormWizard();

    useEffect(() => {
        formWizardStore.setServerValidationErrors(entityEditorData.serverValidationErrors)
    }, [formWizardStore, entityEditorData.serverValidationErrors]);

    useEffect(() => {
        if (entityEditorData.item) {
            formWizardStore.setValues(
                jmixFront_to_ant(entityEditorData.item, options.entityName, metadata)
            );
        }
    }, [formWizardStore, metadata, entityEditorData.item, options.entityName]);

    const handleSelectStep = useCallback(async newStepIndex => {
        await formWizardHelpersRef.current.validateFields();
        formWizardStore.setStepIndex(newStepIndex);
    }, [formWizardStore, formWizardHelpersRef.current.validateFields]);
    
    const handleNextStep = useCallback(async () => {
        await formWizardHelpersRef.current.validateFields();
        formWizardStore.next();
    }, [formWizardStore, formWizardHelpersRef.current, formWizardHelpersRef.current.validateFields]);

    const handlePreviousStep = useCallback(async () => {
        await formWizardHelpersRef.current.validateFields();
        formWizardStore.prev();
    }, [formWizardStore, formWizardHelpersRef.current, formWizardHelpersRef.current.validateFields]);

    const handleSubmitBtn = useCallback(async () => {
        await formWizardHelpersRef.current.validateFields();
        if (formWizardStore.steps.every(step => step.status === 'finish')) {
            try {
                const allValues = formWizardStore.values;
                
                formWizardHelpersRef.current.onFinish(allValues);
            } catch (error) {
                if (formWizardHelpersRef.current.onFinishFailed) {
                    formWizardHelpersRef.current.onFinishFailed(error);
                }
            }
        }
    }, [formWizardHelpersRef.current, formWizardHelpersRef.current.validateFields, entityEditorData.handleSubmit, formWizardStore]);

    return {
        ...entityEditorData,
        handleSelectStep,
        handleNextStep,
        handlePreviousStep,
        handleSubmitBtn,
    };
}
