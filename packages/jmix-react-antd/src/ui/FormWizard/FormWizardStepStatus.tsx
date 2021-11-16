import { observer } from "mobx-react";
import React from "react";
import { useFormWizard } from "./FormWizardContext";
import {Steps} from 'antd';
import {useIntl} from 'react-intl'

export interface FormWizardStepStatusProps {
    onSelectStep: (stepIndex: number) => void;
}

export const FormWizardStepStatus = observer(({onSelectStep}: FormWizardStepStatusProps) => {
    const {formWizardStore} = useFormWizard();
    const {formatMessage} = useIntl()

    return (
        <Steps
            style={{marginBottom: 12}}
            size="small"
            current={formWizardStore.stepIndex}
            onChange={onSelectStep}
        >
            {formWizardStore.steps.map((step, index) => (
                <Steps.Step
                    disabled={step.status === 'wait'}
                    key={step.name}
                    title={formatMessage({id: 'formWizard.stepTitle'}, {index: index + 1})}
                    status={step.status}
                />
            ))}
        </Steps>
    );
});
