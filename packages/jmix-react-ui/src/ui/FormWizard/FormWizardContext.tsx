import React, {useContext, useState, createContext} from 'react';
import { FormWizardStore } from './FormWizardStore';

interface FormWizardHelpers {
    validateFields: () => Promise<void>;
    onFinish: (values: any) => void;
    onFinishFailed?: (error: any) => void;
} 

const defaultFormWizardHelpers: React.MutableRefObject<FormWizardHelpers> = {
    current: {
        validateFields: () => Promise.reject<void>('validateCurrentFields function is undefinded'),
        onFinish: () => new Error('validateCurrentFields function is undefinded'),
        onFinishFailed: undefined, 
    }
};

export const FormWizardContext = createContext<{
    formWizardStore: FormWizardStore,
    formWizardHelpersRef: React.MutableRefObject<FormWizardHelpers>,
}>({
    formWizardStore: new FormWizardStore(),
    formWizardHelpersRef: defaultFormWizardHelpers,
});

export interface FormWizardProviderProps {
    children: React.ReactNode;
}

export const FormWizardProvider = ({
    children
}: FormWizardProviderProps) => {
    const [formWizardStore] = useState(() => new FormWizardStore());

    return (
        <FormWizardContext.Provider value={{
            formWizardStore,
            formWizardHelpersRef: defaultFormWizardHelpers,
        }}>
            {children}
        </FormWizardContext.Provider>
    );
}

export const useFormWizard = () => useContext(FormWizardContext);

export function withFormWizardProvider<P>(Comp: React.ComponentType<P>): React.ComponentType<P> {
    return (props: P) => {
        return (
            <FormWizardProvider>
                <Comp {...props}/>
            </FormWizardProvider>
        )
    }
}
