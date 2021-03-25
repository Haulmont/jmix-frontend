import { Steps, Card, Space, Button, Form, FormInstance } from 'antd';
import React, { useCallback, useEffect, useRef, MutableRefObject } from 'react';
import { FormStepsStore } from './FormStepsStore';
import { observer } from 'mobx-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createAntdFormValidationMessages } from '../../i18n/validation';
import { constructFieldsWithErrors } from '../../util/errorHandling';

export interface FormStepProps {
    children: React.ReactNode
    formStepsStore: FormStepsStore<any>
    formRef: MutableRefObject<FormInstance | null>
}

export const FormStep = observer(({
    children,
    formStepsStore,
    formRef,
}: FormStepProps) => {
    const intl = useIntl();
    const [form] = Form.useForm();

    const onValuesChange = useCallback((_changedValues: any, allValues: any) => formStepsStore.currentStep.setValues(allValues), [formStepsStore.currentStep]);

    useEffect(() => {
        formRef.current = form;
    }, [form, formRef]);

    useEffect(() => {
        form.setFieldsValue(formStepsStore.currentStep.values);
        formStepsStore.currentStep.setStatus('process');
    }, [form, formStepsStore.currentStep, formStepsStore.currentStep.values]);

    useEffect(() => {
        form.setFields(constructFieldsWithErrors(formStepsStore.currentStep.serverFieldErrors, form));
    }, [form, formStepsStore.currentStep.serverFieldErrors]);

    return (
        <Form
            form={form}
            layout="vertical"
            onValuesChange={onValuesChange}
            validateMessages={createAntdFormValidationMessages(intl)}    
        >
            {children}
        </Form>
    );
})

export interface FormStepsManagerProps {
    onFinish: (values: any) => void;
    onFinishFailed?: (error: any) => void;
    formStepsStore: FormStepsStore<any>;
    children: React.ReactNode;
    onCancel?: () => void;
}

export const FormStepsManager = observer(({
    onFinish,
    onCancel,
    onFinishFailed,
    formStepsStore,
    children,
}: FormStepsManagerProps) => {
    const formRef = useRef<FormInstance | null>(null);

    const validateCurrentFields = useCallback(async () => {
        try {
            if (formRef.current) {
                await formRef.current.validateFields();
                formStepsStore.currentStep.setStatus('finish');
            }
        } catch (error) {
            formStepsStore.currentStep.setStatus('error');
        }
    }, [formStepsStore.currentStep, formRef]);

    const onNext = useCallback(async () => {
        await validateCurrentFields();
        formStepsStore.next();
    }, [formStepsStore, validateCurrentFields]);

    const onPrevious = useCallback(async () => {
        await validateCurrentFields();
        formStepsStore.prev();
    }, [formStepsStore, validateCurrentFields]);

    const onSelectStep = useCallback(async (newStepIndex) => {
        await validateCurrentFields();
        formStepsStore.setStepIndex(newStepIndex);
    }, [formStepsStore, validateCurrentFields]);

    const onSubmit = useCallback(async () => {
        await validateCurrentFields();
        try {
            const allValues = formStepsStore.getResult();
            
            onFinish(allValues);
        } catch (error) {
            if (onFinishFailed) {
                onFinishFailed(error);
            }
        }
    }, [validateCurrentFields, onFinish, onFinishFailed, formStepsStore]);

    return (
        <Card>
            <Steps
                style={{marginBottom: 12}}
                size="small"
                current={formStepsStore.stepIndex}
                onChange={onSelectStep}
            >
                {formStepsStore.steps.map(step => (
                    <Steps.Step
                        key={step.NAME}
                        title={step.NAME}
                        status={step.status}
                    />
                ))}
            </Steps>
            
            <FormStep formStepsStore={formStepsStore} formRef={formRef}>
                {children}
            </FormStep>

            <Space>
                {onCancel != null && (
                    <Button onClick={onCancel}>
                        <FormattedMessage id="common.cancel" />
                    </Button>
                )}

                {!formStepsStore.isFirstStep && (
                    <Button onClick={onPrevious}>
                        <FormattedMessage id="common.previous" />
                    </Button>
                )}

                {formStepsStore.isLastStep ? (
                    <Button
                        onClick={onSubmit}
                        type="primary"
                    >
                        <FormattedMessage id="common.submit" />
                    </Button>
                ) : (
                    <Button
                        onClick={onNext}
                        type="primary"
                    >
                        <FormattedMessage id="common.next" />
                    </Button>
                )}
            </Space>
        </Card>
    )
})
