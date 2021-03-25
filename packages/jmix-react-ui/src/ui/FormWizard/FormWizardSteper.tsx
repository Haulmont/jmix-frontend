import { observer } from "mobx-react";
import React from "react";
import { useFormWizard } from "./FormWizardContext";
import {Steps} from 'antd';

interface FormWizardSteperProps {
    onSelectStep: (stepIndex: number) => void;
}

export const FormWizardSteper = observer(({onSelectStep}: FormWizardSteperProps) => {
    const {formWizardStore} = useFormWizard();

    return (
        <Steps
            style={{marginBottom: 12}}
            size="small"
            current={formWizardStore.stepIndex}
            onChange={onSelectStep}
        >
            {formWizardStore.steps.map(step => (
                <Steps.Step
                    key={step.name}
                    title={step.name}
                    status={step.status}
                />
            ))}
        </Steps>
    );
});
