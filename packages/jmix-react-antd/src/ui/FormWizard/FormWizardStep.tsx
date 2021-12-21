import { JmixServerValidationErrors, useClientValidation } from '@haulmont/jmix-react-web';
import { useMetadata } from '@haulmont/jmix-react-core';
import {Form, FormInstance, message} from 'antd';
import { observer } from 'mobx-react';
import React, {useEffect, useCallback, useMemo} from 'react';
import { useIntl } from 'react-intl';
import { useAntdFormValidation } from '../../crud/editor/validation/useAntdFormValidation';
import { useFormWizard } from './FormWizardContext';
import { FormWizardStore, StepStore } from './FormWizardStore';

interface UseSetupStepOptions {
    stepStore?: StepStore;
    formWizardStore: FormWizardStore;
    stepName: string;
    fieldNames: string[];
    form: FormInstance;
    clientValidationErrors?: JmixServerValidationErrors;
}

const useSetupStep = ({
    formWizardStore,
    stepStore,
    fieldNames,
    form,
    stepName,
    clientValidationErrors,
}: UseSetupStepOptions) => {
    const intl = useIntl();

    useEffect(() => {
        const stepValues = Object.entries(formWizardStore.values)
            .reduce<Record<string, any>>((acc, [key, value]) => {
                if (fieldNames.includes(key)) {
                    return {...acc, [key]: value}
                }
                return acc
            }, {});

        form.setFieldsValue(stepValues);
    }, [fieldNames, form, formWizardStore.values]);

    useEffect(() => {
        if (
            formWizardStore.currentStep?.name === stepName
            && formWizardStore.currentStep.status !== 'error'
        ) {
            stepStore?.setStatus('process');
        }
    }, [formWizardStore, formWizardStore.currentStep, stepName, stepStore]);

    const stepServerValidation = useMemo(() => {
        const stepFieldErrors = new Map<string, string[]>();

        if (
            clientValidationErrors?.fieldErrors != null
            && clientValidationErrors?.fieldErrors.size > 0
        ) {
            clientValidationErrors.fieldErrors.forEach(
                (fieldErrorValue, fieldErrorKey) => {
                    if (fieldNames.includes(fieldErrorKey)) {
                        stepFieldErrors.set(fieldErrorKey, fieldErrorValue);
                    }
                }
            );
        } else if (formWizardStore.serverValidationErrors?.fieldErrors != null) {
            formWizardStore.serverValidationErrors.fieldErrors?.forEach(
                (fieldErrorValue, fieldErrorKey) => {
                    if (fieldNames.includes(fieldErrorKey)) {
                        stepFieldErrors.set(fieldErrorKey, fieldErrorValue);
                    }
                }
            );
        }

        return {
            ...formWizardStore.serverValidationErrors,
            fieldErrors:
                stepFieldErrors.size > 0
                    ? stepFieldErrors
                    : undefined
        };
    }, [clientValidationErrors?.fieldErrors, formWizardStore.serverValidationErrors, fieldNames]);

    useEffect(() => {
        if (
            stepServerValidation.fieldErrors != null
            && stepServerValidation.fieldErrors.size > 0
        ) {
            stepStore?.setStatus('error');
        }
    }, [intl, stepServerValidation.fieldErrors, stepServerValidation.fieldErrors?.size, stepStore]);

    useAntdFormValidation(form, stepServerValidation);
}

export interface FormWizardStepProps {
    children: React.ReactNode;
    stepName: string;
    fieldNames: string[];
}

export const FormWizardStep = observer(({
    children,
    stepName,
    fieldNames,
}: FormWizardStepProps) => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const metadata = useMetadata();

    const {formWizardStore, formWizardHelpersRef} = useFormWizard();
    const [executeClientValidation, clientValidationErrors] = useClientValidation();

    useEffect(() => {
        formWizardStore.addStep(new StepStore({
            name: stepName,
            fieldNames,
        }));
    }, [formWizardStore, stepName, fieldNames]);

    const stepStore = formWizardStore.getStepByName(stepName);

    const validateCurrentStep = useCallback(async () => {
        try {
            const values = form.getFieldsValue();
            const isClientValid = formWizardStore.entityName != null
                && executeClientValidation(values, formWizardStore.entityName, metadata);

            if (isClientValid) {
                await form.validateFields();
                stepStore?.setStatus('finish');
            } else {
                throw new Error('Client validation is failed');
            }
        } catch (error) {
            console.error(error);
            stepStore?.setStatus('error');
            message.error(intl.formatMessage({ id: 'formWizard.currectStepValidationError'}));
            throw error;
        }
    }, [form, formWizardStore.entityName, executeClientValidation, metadata, stepStore, intl]);

    useEffect(() => {
        if (formWizardStore.currentStep?.name === stepName) {
            formWizardHelpersRef.current = {
                ...formWizardHelpersRef.current,
                validateFields: validateCurrentStep,
            };
        }
    }, [formWizardHelpersRef, formWizardStore.currentStep?.name, stepName, validateCurrentStep]);

    const handlerValuesChange = useCallback((newValues) => {
        formWizardStore.setValues({
            ...formWizardStore.values,
            ...newValues
        });
    }, [formWizardStore]);

    useSetupStep({
        formWizardStore,
        stepStore,
        stepName,
        fieldNames,
        form,
        clientValidationErrors,
    });


    const style = useMemo(() => {
        return {display: formWizardStore.currentStep?.name !== stepName ? 'none' : undefined}
    }, [formWizardStore.currentStep, stepName]);

    return (
        <Form
            form={form}
            layout="vertical"
            onValuesChange={handlerValuesChange}
            validateMessages={formWizardStore.validateMessages}
            style={style}
        >
            {children}
        </Form>
    );
})
