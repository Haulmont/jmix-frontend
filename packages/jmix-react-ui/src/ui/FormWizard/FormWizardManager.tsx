import React, {useEffect} from 'react';
import { FormProps } from 'antd';
import { useFormWizard } from './FormWizardContext';

export interface FormWizardManagerProps {
    onFinish: (values: any) => void;
    onFinishFailed?: (error: any) => void;
    children: React.ReactNode;
    validateMessages: FormProps['validateMessages'];
}

export const FormWizardManager = ({
    onFinish,
    onFinishFailed,
    children,
    validateMessages,
}: FormWizardManagerProps) => {
    const {formWizardStore, formWizardHelpersRef} = useFormWizard();
    
    useEffect(() => {
        formWizardStore.setValidateMessages(validateMessages);
    }, [formWizardStore, validateMessages]);

    useEffect(() => {
        formWizardHelpersRef.current = {
            ...formWizardHelpersRef.current,
            onFinish,
            onFinishFailed,
        }
    }, [onFinish, onFinishFailed, formWizardHelpersRef.current]);

    return (
        <>
            {children}
        </>
    )
};
