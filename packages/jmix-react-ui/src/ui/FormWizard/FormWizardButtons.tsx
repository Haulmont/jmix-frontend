import { Space, Button } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useFormWizard } from "./FormWizardContext";

export interface FormWizardButtonsProps {
    onNextStep: () => void;
    onPreviousStep: () => void;
    onSubmit: () => void;
    onCancel?: () => void;
}

export const FormWizardButtons = observer(({
    onNextStep,
    onPreviousStep,
    onSubmit,
    onCancel,
}: FormWizardButtonsProps) => {
    const {formWizardStore} = useFormWizard();

    return (
        <Space>
            {onCancel != null && (
                <Button onClick={onCancel}>
                    <FormattedMessage id="common.cancel" />
                </Button>
            )}

            {!formWizardStore.isFirstStep && (
                <Button onClick={onPreviousStep}>
                    <FormattedMessage id="common.previous" />
                </Button>
            )}

            {formWizardStore.isLastStep ? (
                <Button
                    onClick={onSubmit}
                    type="primary"
                >
                    <FormattedMessage id="common.submit" />
                </Button>
            ) : (
                <Button
                    onClick={onNextStep}
                    type="primary"
                >
                    <FormattedMessage id="common.next" />
                </Button>
            )}
        </Space>
    );
});
