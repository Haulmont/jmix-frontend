import { observer } from "mobx-react";
import React from "react";
import { useFormWizard } from "./FormWizardContext";
import {Steps} from 'antd';

export interface FormWizardStepStatusProps {
    onSelectStep: (stepIndex: number) => void;
}

export const FormWizardStepStatus = observer(({onSelectStep}: FormWizardStepStatusProps) => {
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
                    disabled={step.status === 'wait'}
                    key={step.name}
                    title={step.name}
                    status={step.status}
                />
            ))}
        </Steps>
    );
});
