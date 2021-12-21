import React, {useEffect} from 'react';
import { FormProps, message } from 'antd';
import { useFormWizard } from './FormWizardContext';
import { useIntl } from 'react-intl';
import { observer } from 'mobx-react';

export interface FormWizardManagerProps {
    entityName: string;
    onFinish: (values: any) => void;
    onFinishFailed?: (error: any) => void;
    children: React.ReactNode;
    validateMessages: FormProps['validateMessages'];
}

export const FormWizardManager = observer(({
    entityName,
    onFinish,
    onFinishFailed,
    children,
    validateMessages,
}: FormWizardManagerProps) => {
    const {formWizardStore, formWizardHelpersRef} = useFormWizard();
    const intl = useIntl();
    
    useEffect(() => {
        formWizardStore.setEntityName(entityName);
    }, [entityName, formWizardStore]);

    useEffect(() => {
        formWizardStore.setValidateMessages(validateMessages);
    }, [formWizardStore, validateMessages]);

    useEffect(() => {
        formWizardHelpersRef.current = {
            ...formWizardHelpersRef.current,
            onFinish,
            onFinishFailed,
        }
    }, [onFinish, onFinishFailed, formWizardHelpersRef]);

    useEffect(() => {
        if (
            formWizardStore.serverValidationErrors?.fieldErrors != null
            && formWizardStore.serverValidationErrors.fieldErrors.size > 0
        ) {
            message.error(intl.formatMessage({ id: "formWizard.serverValidationError"}));
        }
    }, [formWizardStore.serverValidationErrors?.fieldErrors, formWizardStore.serverValidationErrors?.fieldErrors?.size, intl]);

    return (
        <>
            {children}
        </>
    )
});
