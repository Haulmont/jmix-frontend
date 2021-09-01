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
}

const useSetupStep = ({
    formWizardStore,
    stepStore,
    fieldNames,
    form,
    stepName,
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
    }, [form, formWizardStore.values]);

    useEffect(() => {
        if (
            formWizardStore.currentStep?.name === stepName
            && formWizardStore.currentStep.status !== 'error'
        ) {
            stepStore?.setStatus('process');
        }
    }, [formWizardStore, formWizardStore.currentStep])

    const stepServerValidation = useMemo(() => {
        const stepFieldErrors = new Map<string, string[]>();
        
        formWizardStore.serverValidationErrors?.fieldErrors?.forEach(
            (fieldErrorValue, fieldErrorKey) => {
                if (fieldNames.includes(fieldErrorKey)) {
                    stepFieldErrors.set(fieldErrorKey, fieldErrorValue);
                }
            }
        );
        
        if (stepFieldErrors.size > 0) {
            stepStore?.setStatus('error');
            message.error(intl.formatMessage({ id: "formWizard.serverValidationError"}));
        }
        
        return {
            ...formWizardStore.serverValidationErrors,
            fieldErrors:
                stepFieldErrors.size > 0
                    ? stepFieldErrors
                    : undefined
        };
    }, [form, stepStore, formWizardStore.serverValidationErrors]);

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

    const {formWizardStore, formWizardHelpersRef} = useFormWizard();

    useEffect(() => {
        formWizardStore.addStep(new StepStore({
            name: stepName,
            fieldNames,
        }));
    }, [formWizardStore, stepName, fieldNames]);

    const stepStore = formWizardStore.getStepByName(stepName);

    const validateCurrentStep = useCallback(async () => {
        try {
            await form.validateFields();
            stepStore?.setStatus('finish');
        } catch (error) {
            console.error(error);
            stepStore?.setStatus('error');
            message.error(intl.formatMessage({ id: 'formWizard.currectStepValidationError'}));
            throw error;
        }
    }, [form, formWizardStore.steps, formWizardStore.stepIndex]);

    useEffect(() => {
        if (formWizardStore.currentStep?.name === stepName) {
            formWizardHelpersRef.current = {
                ...formWizardHelpersRef.current,
                validateFields: validateCurrentStep,
            };
        }
    }, [validateCurrentStep]);

    const handlerValuesChange = useCallback((newValues) => {
        formWizardStore.setValues({
            ...formWizardStore.values,
            ...newValues
        });
    }, [formWizardStore, formWizardStore.values]);

    useSetupStep({
        formWizardStore,
        stepStore,
        stepName,
        fieldNames,
        form,
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
