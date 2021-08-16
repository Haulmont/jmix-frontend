import { FormProps } from 'antd';
import { observable, makeObservable, action, computed } from 'mobx';
import { JmixServerValidationErrors } from '@haulmont/jmix-react-web';

export const selectStepFieldErrors = (fieldErrors: Map<string, string[]>, fieldNames: string[]): Map<string, string[]> => {
    const stepFieldErrors = new Map<string, string[]>()
    fieldErrors.forEach((value: any, key: any) => {
        if(fieldNames.includes(key)) {
            stepFieldErrors.set(key, value)
        }
    })
    return stepFieldErrors
}

export interface FormWizardStepConfig {
    name: string;
    fieldNames: string[];
}

export class StepStore {
    name: string;
    fieldNames: string[];
    status: 'wait' | 'process' | 'finish' | 'error' = 'wait';

    constructor(config: FormWizardStepConfig) {
        makeObservable(this, {
            status: observable,
            setStatus: action

        })
        this.fieldNames = config.fieldNames;
        this.name = config.name;
    }

    setStatus(status: 'wait' | 'process' | 'finish' | 'error') {
        this.status = status;
    }
}

export class FormWizardStore {
    stepIndex = 0;

    steps: StepStore[] = [];

    values: any = {};

    validateMessages: FormProps['validateMessages'] = undefined;
    serverValidationErrors: JmixServerValidationErrors | undefined = undefined;

    constructor() {
        makeObservable(this, {
            validateMessages: observable,
            setValidateMessages: action,
            stepIndex: observable,
            steps: observable,
            isFirstStep: computed,
            isLastStep: computed,
            currentStep: computed,
            next: action,
            prev: action,
            setStepIndex: action,
            values: observable,
            setValues: action,
            addStep: action,
            serverValidationErrors: observable,
            setServerValidationErrors: action,
        });
    }

    get isFirstStep(): boolean {
        return this.stepIndex === 0;
    }

    get isLastStep(): boolean {
        return this.stepIndex === Object.keys(this.steps).length - 1;
    }

    get currentStep(): StepStore | undefined {
        return this.steps[this.stepIndex];
    }

    setServerValidationErrors(serverValidationErrors: JmixServerValidationErrors | undefined) {
        this.serverValidationErrors = serverValidationErrors;
    }
    
    setValidateMessages(validateMessages: FormProps['validateMessages']) {
        this.validateMessages = validateMessages;
    }

    addStep(stepStore: StepStore) {
        if (this.steps.find(step => step.name === stepStore.name) == null) {
            this.steps.push(stepStore);
        } else {
            this.steps.reduce(step => step.name === stepStore.name ? stepStore : step);
        }
    }

    next() {
        this.stepIndex += 1;
    }
    prev() {
        this.stepIndex -= 1;
    }

    setStepIndex(stepIndex: number) {
        this.stepIndex = stepIndex;
    }

    setValues(values: any) {
        this.values = {...values};
    }

    // Helpers
    getStepByName(stepName: string): StepStore | undefined {
        return this.steps.find(step => step.name === stepName);
    }
}
